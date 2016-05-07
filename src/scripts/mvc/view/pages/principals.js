var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var Image = require('../modules/image');
var GradientBackground = require('../modules/gradient_background');
var Faces = require('../modules/faces');
var InfoBlocks = require('../modules/info_blocks');

module.exports = BaseView.extend({
    htmlCanvas    : null,
    gradientShapes: null,
    gradients     : null,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        if (Config.DESKTOP) {

            this.$('li').on('click', _.bind(this.onNameClick, this));
        }
        this.$('.info span').addClass('hidden');

        this.background = new GradientBackground({
                el       : this.$('#principals-canvas'),
                gradients: [{color: 0x6c628e}, {color: 0xf7d3db}]
            }
        );
        var ids = ['matt', 'josh', 'scott', 'brad', 'abe'];
        this.faces = new Faces({
            el : this.$('.js-mugshot'),
            ids: ids
        })

        this.infoBlocks = new InfoBlocks({
            el : this.$('.js-info-holder'),
            ids: ids
        });

    },

    render: function () {
        this.background.render();
        TweenMax.to(this.faces.el, 0, {x: window.innerWidth});
        AppModel.on('request-animation-frame', this.onUpdate, this);
    },

    onUpdate: function () {
        this.background.update();
    },

    onNameClick: function (e) {

        TweenMax.to(this.$('.js-names'), 0.5, {'alpha': 0});

        var $name = $(e.currentTarget);
        var data = $name.data();
        var person = data.person;

        this.faces.showFace(person);
        var time = 0.5;
        this.infoBlocks.showTitle();
        var complete = _.bind(function () {
            this.showInfo(person);
        }, this);

        var xpos = window.innerWidth - this.faces.$el.width();
        TweenMax.to(this.$('.js-swiper'), time, {
            width     : xpos,
            onComplete: complete
        });

        TweenMax.to(this.faces.el, time, {
            x: xpos
        });

        this.background.show(xpos, time);

        this.$el.on('mousedown', _.bind(this.onExitClick, this));
    },

    showInfo: function (person) {

        TweenMax.set(this.$('.js-swiper'), {width: window.innerWidth});

        this.infoBlocks.show(person);
    },

    showNames: function () {

        var xpos = window.innerWidth - this.faces.$el.width();
        TweenMax.set(this.$('.js-swiper'), {width: xpos});
        TweenMax.to(this.$('.js-names'), 0.5, {'alpha': 1});
        this.infoBlocks.hide();
    },

    onExitClick: function () {

        this.$el.off('mousedown');
        this.showNames();
        var time = 0.5;
        TweenMax.to($('.js-swiper'), time, {
            width: 0,
            x    : 0
        });

        TweenMax.to(this.faces.el, time, {
            x: window.innerWidth
        });

        this.background.hide(time, window.innerWidth);
    },

    onResize: function () {
        var reset = false;
        if (this.$('.js-names').hasClass('hidden')) {
            reset = true;
            this.$('.js-names').removeClass('hidden');
        }
        var padding = -0;
        var textHeight = this.$('.js-copy').height();
        var totalHeight = this.$el.height();

        var offset = totalHeight / 2 - textHeight / 2;
        var ypos = offset + padding;
        if (ypos <= 0) {
            ypos = 0;
        }

        TweenMax.set(this.$('.js-info-holder'), {
            y    : ypos,
            width: 0.55 * window.innerWidth
        });
        TweenMax.set(this.$('.js-copy'), {y: ypos});
        TweenMax.set(this.$('.js-content'), {height: totalHeight});
        TweenMax.set(this.$el, {height: totalHeight});

        this.background.resize(window.innerWidth, totalHeight);

        if (reset) {
            this.$('.js-names').addClass('hidden');

        }

        //set the ofset in pixels
        this.$('.js-info-holder').css({'margin-left': window.innerWidth * 0.1});

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

