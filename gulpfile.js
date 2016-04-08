'use strict';

var
    credentials = require('./credentials.json'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),

    gulp = require('gulp'),
    awspublish = require('gulp-awspublish'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    htmlreplace = require('gulp-html-replace'),
    replace = require('gulp-replace'),
    del = require('del'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    fileInclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    sync = require('gulp-sync')(gulp),
    sass = require('gulp-sass'),
    fontgen = require('gulp-fontgen'),
    imagemin = require('gulp-imagemin'),
    gulpCopy = require('gulp-copy'),
    assign = require('lodash.assign'),
    useref = require('gulp-useref'),
    karma = require('karma').Server;

// set up the browserify instance on a task basis
// add custom browserify options here
var customOpts = {
    entries     : ['./src/scripts/app.js'],
    cache       : {},
    packageCache: {},
    noparse     : [
        'jquery',
        'backbone',
        'handlebars',
        'underscore'
    ],
    debug       : !(argv.r || argv.release)
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

var paths = {
    cdn_path: 'CDN_PATH',
    dist    : 'dist/'
};

var tasks = {

    setCDN: function () {
        paths.cdn_path = 'CDN_' + Date.now().toString();
    },

    // Clean
    clean  : function (cb) {
        return del([paths.dist + '*'], cb);
    },
    // Layouts
    layouts: function () {
        return gulp.src('src/layouts/index.html')
            .pipe(fileInclude({}))
            .pipe(replace('CDN_PATH', paths.cdn_path))
            .pipe(useref())
            .pipe(gulp.dest(paths.dist));
    },
    // Scripts
    scripts: function () {
        return b.bundle()
            //has to be the first in the pipe!
            .on('error', function (err) {
                    console.log(err.message);
                    this.emit("end");
                })
            .pipe(source('bundle.min.js'))
            .pipe(buffer())
            .pipe(replace('CDN_PATH', paths.cdn_path))
            .pipe(gulpif(!(argv.r || argv.release), sourcemaps.init({loadMaps: true})))
            // Add transformation tasks to the pipeline here.
            .pipe(gulpif((argv.r || argv.release), uglify()))

            .pipe(gulpif(!(argv.r || argv.release), sourcemaps.write()))
            .pipe(gulp.dest(paths.dist + paths.cdn_path + '/js/'));




    },
    svg: function () {
        return gulp.src('src/assets/svg/**/*.svg')
            .pipe(svgmin())
            .pipe(svgstore({
                      fileName : 'icons.svg',
                      inlineSvg: true
                  }))
            .pipe(cheerio({
                      run          : function ($, file) {
                          $('svg').addClass('hidden');
                          $('[fill]').removeAttr('fill');
                      },
                      parserOptions: {xmlMode: true}
                  }))
            .pipe(gulp.dest('src/layouts/includes'));
    },

    // Lint Task
    lint       : function () {
        return gulp.src(['src/scripts/**/*.js',
                         '!src/scripts/libs/**/*.js',
                         '!src/scripts/vendor/**/*.js'
        ])
            .pipe(jshint({expr: true}))
            .pipe(jshint.reporter('jshint-stylish'));
    },
    // Stylesheets
    stylesheets: function () {
        return gulp.src('src/stylesheets/app.scss')
            .pipe(replace('CDN_PATH', paths.cdn_path))
            .pipe(gulpif(!(argv.r || argv.release), sourcemaps.init({loadMaps: true})))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename('styles.min.css'))
            .pipe(gulpif(!(argv.r || argv.release), sourcemaps.write()))
            .pipe(gulp.dest(paths.dist + paths.cdn_path + '/css/'))
            .pipe(browserSync.stream());
    },
    // Optimize Images
    optimize   : function () {
        return gulp.src('./dist/assets/**/*.{gif,jpg,png,svg}')
            .pipe(imagemin({
                      progressive      : true,
                      svgoPlugins      : [{removeViewBox: false}],
                      // png optimization
                      optimizationLevel: argv.r || argv.release ? 3 : 1
                  }))
            .pipe(gulp.dest(paths.dist + paths.cdn_path + '/assets/'));
    },

    assets: function () {

        return gulp.src('./src/assets/**/*')
            .pipe(gulpCopy(paths.dist + paths.cdn_path + '/assets/', {prefix: 2}));
    },

    fonts: function () {
        return gulp.src("./src/assets/fonts/**/*.{ttf,otf}")
            .pipe(gulpif(!(argv.f || argv.fonts), fontgen({
                      dest: paths.dist + paths.cdn_path + "/assets/fonts/"
                  })));
    },
    // Tests with Jasmine
    test : function (done) {
        return karma.start({
            configFile: __dirname + '/karma.conf.js',
            singleRun : !(argv.w || argv.watch)
        }, function (res) {
            done();
        });
    },

    // Watchers
    watch       : function () {
        tasks.scripts();

        b.on('update', function () {
            tasks.scripts();
        });
        b.on('log', function (msg) {
            var d = new Date();
            var time = d.getHours() + ':' + d.getMinutes() + ":" + d.getSeconds();
            console.log(time + " ::: " + msg);
        });

        var src = {
            layouts    : 'src/layouts/**/*.html',
            stylesheets: 'src/stylesheets/**/*.scss',
            scripts    : 'src/scripts/**/*.js'
        };
        var dist = {
            html: paths.dist + 'index.html',
            css : paths.dist + paths.cdn_path + '/css/styles.min.css',
            js  : paths.dist + paths.cdn_path + '/js/bundle.min.js'
        };

        gulp.watch([src.layouts], ['layouts']);
        gulp.watch([src.scripts], ['lint']);
        gulp.watch([src.stylesheets], ['stylesheets']);
        gulp.watch([dist.html, dist.js]).on('change', browserSync.reload);
    },
    // Browser Sync
    browser_sync: function () {
        browserSync.init({
            server        : {
                baseDir: 'dist'
            },
            logLevel      : 'debug',
            logConnections: true
        });
    },
    //Deploy

    s3: function () {

        // create a new publisher using S3 options
        // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
        var publisher = awspublish.create({
            region         : 'ap-southeast-2',
            accessKeyId    : credentials.s3.accessKeyId,
            secretAccessKey: credentials.s3.secretAccessKey,
            params         : {

                Bucket: 'table.touchtech.co.nz'
            }
        });

        // define custom headers
        var headers = {
            'Cache-Control': 'max-age=315360000, no-transform, public'
            // ...
        };

        return gulp.src('dist/**/*.*')
            // gzip, Set Content-Encoding headers and add .gz extension
            //.pipe(awspublish.gzip({ext: '.gz'}))

            // publisher will add Content-Length, Content-Type and headers specified above
            // If not specified it will set x-amz-acl to public-read by default
            .pipe(publisher.publish(headers))

            // create a cache file to speed up consecutive uploads
            .pipe(publisher.cache())

            // print upload updates to console
            .pipe(awspublish.reporter());
    }
};

// Register Tasks
gulp.task('clean', tasks.clean);
gulp.task('watchify', tasks.watchify);
gulp.task('layouts', tasks.layouts);
gulp.task('scripts', tasks.scripts);
gulp.task('lint', tasks.lint);
gulp.task('stylesheets', tasks.stylesheets);
gulp.task('assets', tasks.assets);
gulp.task('optimize', ['assets'], tasks.optimize);
gulp.task('fonts', tasks.fonts);
gulp.task('test', tasks.test);
gulp.task('watch', tasks.watch);
gulp.task('upload', tasks.s3);
gulp.task('setCDN', tasks.setCDN);
gulp.task('svg', tasks.svg);

gulp.task('browser_sync', tasks.browser_sync);

// Build tasks
gulp.task('default', sync.sync(['clean',
                                ['svg','stylesheets', 'assets', 'optimize', 'fonts', 'lint', 'scripts',
                                 'layouts']]));
gulp.task('live', sync.sync(['clean', ['setCDN', 'stylesheets', 'optimize', 'fonts', 'lint', 'scripts', 'layouts'],
                             'browser_sync', 'watch']));
