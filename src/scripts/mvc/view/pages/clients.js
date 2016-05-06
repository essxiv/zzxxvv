var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var ScrollModel = require('../../model/scroll_model');
var IdolElement = require('../modules/idol_element');

module.exports = BaseView.extend({

    svgIDs  : [],
    logos   : [],
    elements: [],

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.logos = $('.client');

        _.each(this.logos, function (logoElement) {

            var logo = new IdolElement({el: logoElement});
            this.elements.push(logo);
        }, this);

        AppModel.on('request-animation-frame', this.onUpdate, this);

    },

    onUpdate: function () {

        var scrollPosition = $(window).scrollTop();
        var offset = window.innerHeight;

        var inRange = [];

        for (var i = 0; i < this.elements.length; i++) {

            var element = this.elements[i];
            if (element.originalY < scrollPosition + offset) {
                inRange.push(element);
            }

        }

        var delay = 0;
        var delayIncrement = 0.2;
        var time = 0.5;
        var prevY;

        for (i = 0; i < inRange.length; i++) {
            var inRangeElement = inRange[i];
            if (!inRangeElement.isShowing) {

                inRangeElement.show(time, delay);
                delay += delayIncrement;
                if (prevY && inRange.originalY !== prevY) {
                    delay = 0;
                }
                prevY = inRange.originalY;
            }

        }
    },

    render: function () {

        this.$el.on('click', _.bind(this.onClick, this));

    },

    onClick: function () {
        EventBus.trigger(EventBus.EVENTS.NAVIGATE, AppModel.PAGES.PORTFOLIO);
    },

    onResize: function () {
        var height = window.innerHeight;
        var width = this.$('.js-content').width();
        var defaultwidth = 157;
        var defaultHeight = 154;
        var ratio = defaultHeight / defaultwidth;
        var amountOfLogos = this.logos.length;

        var padding = 40;
        var paddingTop = 0;
        var maxHeight = 80;
        var columns = 5;
        var paddingBottom = 0;

        if (width < 768) {
            padding = 20
            columns = 4;
            paddingTop = 100;
            paddingBottom = 20;
        }

        var newWidth = ((width - ((columns * 2) * padding)) / columns);

        _.each(this.logos, function (node) {

            $(node).css({
                height         : 100 / (columns) + '%',
                width          : newWidth,
                'max-height'   : maxHeight + 'px',
                //'max-width'   : 100 + 'px',
                'padding-left' : padding + 'px',
                'padding-right': padding + 'px',
                'margin-bottom': paddingBottom

            });
        });

        var textHeight = this.$('.js-logos').height();
        var totalHeight = this.$el.height();
        var offset = ((totalHeight + paddingTop / 2) - textHeight) / 2;

        TweenMax.set(this.$('.js-content'), {y: offset});
        TweenMax.set(this.$('.js-content'), {height: textHeight + paddingTop});

        if (this.$('.js-content').height() > height) {
            //this.$('.js-content').removeClass('high');
            //this.$('.js-content').addClass('low');
            //this.$el.addClass('scroll');

        } else {
            this.$('.js-content').addClass('high');
            //this.$('.js-content').removeClass('low');
            //this.$el.removeClass('scroll');
        }

        for (var i = 0; i < this.elements.length; i++) {

            var element = this.elements[i];
            element.setStartPosition();
        }

    },

    destroy: function () {
        this.$el.off();
        //this.$('.js-content').empty();
        this.svgIDs = [];
        this.logos = [];

        BaseView.prototype.destroy.apply(this);

    },

});

