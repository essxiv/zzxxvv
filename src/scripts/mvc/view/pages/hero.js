var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var $ = require('jquery');
var _ = require('underscore');

var Letter = require('../modules/letter');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var ScrollModel = require('../../model/scroll_model');
//require('TweenMaxScrollToPlugin');

module.exports = BaseView.extend({

    $video        : null,
    nextSlideBound: null,
    svgIDs        : [],
    logos         : [],
    letters       : [],
    videoWidth    : 1920,
    videoHeight   : 1080,

    initialize: function (options) {

        window.$ = $;
        BaseView.prototype.initialize.apply(this);
        this.nextSlideBound = _.bind(this.nextSlide, this);

        this.$video = this.$('.js-hero-video ');

        this.ratio = this.videoWidth / this.videoHeight;

        _.each(this.$('.js-letter'), function (letterElement) {

            this.letters.push(new Letter({el: letterElement}));
        }, this);

        var symbols = $('symbol');
        _.each(symbols, function (s) {
            var $s = $(s);
            var id = $s.attr('id');
            if (id.indexOf('hero-logo') > -1 && this.svgIDs.indexOf(id) === -1) {
                this.svgIDs.push(id);
            }
        }, this);

        _.each(this.svgIDs, function (id) {
            var node = $(' <svg class="logo hidden"><use xlink:href="#' + id + '"/></svg>');
            this.logos.push(node);
            this.$('.js-logo-holder').append(node);
        }, this);

    },

    render: function () {

    },

    show: function () {
        var delay = 1;

        _.each(this.letters, function (letter) {
            letter.show(delay);
            delay += 0.5
        }, this);

        _.each(this.logos, function (node) {
            node.addClass('hidden');
        }, this);

        this.startSlideShow(delay + 1);
    },

    startSlideShow: function (delay) {
        this.slideIndex = Math.floor(Math.random() * (this.logos.length - 1));
        this.nextSlide(delay);
    },

    nextSlide: function (delay) {
        if (!delay) {
            delay = 0;
        }
        var prevLogo = this.logos[this.slideIndex];
        prevLogo.addClass('hidden');

        this.slideIndex++;
        if (this.slideIndex > this.logos.length - 1) {
            this.slideIndex = 0;
        }
        var currentLogo = this.logos[this.slideIndex];
        currentLogo.removeClass('hidden');

        var tl = new TimelineMax({
            delay: 0
        });

        var animationTime = 0.6;

        tl.fromTo(currentLogo, animationTime, {

            'scale': 0.9,
            'alpha': 0,
        }, {

            'alpha': 1,
            scale  : 1,
            'ease' : 'Power3.easeInOut'
        });

        tl.play();
        delay += animationTime + 1;

        console.log('BOOM');
        TweenMax.delayedCall(delay, this.nextSlideBound);

    },

    onClick: function (position) {

        this.holder.removeClass('hidden');

    },

    onResize: function () {

        var newHeight = window.innerHeight;
        var newWidth = newHeight * this.ratio;
        var offsetX = 0;
        var offsetY = 0;

        if (newWidth < window.innerWidth) {
            newHeight = window.innerWidth / this.ratio;
            offsetY = -(newHeight - window.innerHeight) / 2;
        }

        if (newWidth > window.innerWidth) {
            offsetX = -(newWidth - window.innerWidth) / 2;
        }

        this.$video.attr('height', newHeight);
        this.$video.css({
            'margin-left': offsetX,
            'margin-top' : offsetY
        });

    },

    hide: function () {

        TweenMax.killDelayedCallsTo(this.nextSlideBound);
        var delay = 0;
        _.each(this.letters, function (letter) {
            letter.hide(delay);
            delay += 0.5
        }, this);
    }

});

