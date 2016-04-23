var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var Image = require('../modules/image');
var GradientBlob = require('../modules/gradient_blob');
var GradientBackground = require('../modules/gradient_background');

module.exports = BaseView.extend({
    htmlCanvas    : null,
    gradientShapes: null,
    gradients     : null,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.$('li').on('click', _.bind(this.onNameClick, this));
        this.$('.info span').addClass('hidden');

        this.background = new GradientBackground({

                el       : this.$('#principals-canvas'),
                gradients: [
                    {
                        color: 0x6c628e,
                        id   : 'purple'
                    },
                    {
                        color: 0xf7d3db,
                        id   : 'pink'
                    }
                ]
            }
        );

    },

    render: function () {

        this.background.render();
        AppModel.on('request-animation-frame', this.onUpdate, this);

    },

    onUpdate: function () {
        this.background.update();
    },

    onNameClick: function (e) {

        var $name = $(e.currentTarget);
        var data = $name.data();
        var person = '.' + data.person;
        var time = 0.5;
        var complete = _.bind(function () {

            this.$('.js-mugshot').addClass(data.person);

            this.$('.mugshot').removeClass('hidden');
            this.$('span' + person).removeClass('hidden');
            this.$el.addClass('person-selected');

        }, this);

        this.$('.js-info-holder').removeClass('hidden');
        this.$('.js-names').addClass('hidden');

        TweenMax.to(this.$('.js-swiper'), time, {
            width     : '100%',
            onComplete: complete
        });

        this.background.show(window.innerWidth, time);

        this.$el.on('mousedown', _.bind(this.onExitClick, this));
    },

    onExitClick: function () {

        console.log('yes')
        this.$el.removeClass('person-selected');
        this.$('.js-names').removeClass('hidden');
        this.$('span').removeClass('hidden');

        this.$('.js-mugshot').removeClass('matt josh scott brad abe');

        this.$('js-info-holder span').addClass('hidden');
        this.$('.mugshot').addClass('hidden');
        this.$('.js-info-holder').addClass('hidden');
        this.$('.js-title').addClass('pink');

        this.$el.off('mousedown');
        TweenMax.set($('.js-swiper'), {
            width: 0,
            x    : 0
        });
        var time = 0.5;
        this.background.hide(time);
    },

    onResize: function () {
        var reset = false;
        if (this.$('.js-names').hasClass('hidden')) {
            reset = true;
            this.$('.js-names').removeClass('hidden');
        }
        var padding = 300;
        var textHeight = this.$('.js-copy').height() + padding;
        if (textHeight < window.innerHeight) {
            textHeight = window.innerHeight;
        }
        var totalHeight = this.$el.height();
        var offset = totalHeight / 2 - textHeight / 2;
        var ypos = offset + padding / 2;

        TweenMax.set(this.$('.js-info-holder'), {
            y    : ypos,
            width: 0.55 * window.innerWidth
        });
        TweenMax.set(this.$('.js-copy'), {y: ypos});
        TweenMax.set(this.$('.js-content'), {height: textHeight});
        TweenMax.set(this.$el, {height: textHeight});

        this.background.resize(window.innerWidth, textHeight);

        if (reset) {
            this.$('.js-names').addClass('hidden');

        }

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

