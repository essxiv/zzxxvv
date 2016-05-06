var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var Image = require('../modules/image');
var IdolElement = require('../modules/idol_element');

module.exports = BaseView.extend({

    big_image_urls  : [
        Config.CDN + '/assets/images/portfolio/big_1.jpg',
        Config.CDN + '/assets/images/portfolio/big_2.jpg',
        Config.CDN + '/assets/images/portfolio/big_3.jpg'
    ],
    small_image_urls: [
        Config.CDN + '/assets/images/portfolio/small_1.jpg',
        Config.CDN + '/assets/images/portfolio/small_2.jpg',
        Config.CDN + '/assets/images/portfolio/small_3.jpg',
        Config.CDN + '/assets/images/portfolio/small_4.jpg',
        Config.CDN + '/assets/images/portfolio/small_5.jpg',
    ],

    smallImages: [],
    bigImages  : [],

    image_holder_big  : null,
    image_holder_small: null,
    holder            : null,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.image_holder_big = this.$('.js-item.big');
        this.image_holder_small = this.$('.js-item.small');
        this.holder = this.$('.js-content');
        this.loadBigImages();
        this.loadSmallImages();

        this.elements = [];

        _.each(this.$('.js-item'), function (image) {

            var element = new IdolElement({el: image});
            this.elements.push(element);
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
    },

    onClick: function () {
    },

    onResize: function () {
        var bigImageWidth = (1 / this.image_holder_big.length) * this.holder.width();
        var smallImageWidth = (1 / this.image_holder_small.length) * this.holder.width();
        var bigImageHeight = 0.6 * this.holder.height();
        var smallImageHeight = 0.4 * this.holder.height();

        this.image_holder_big.css({
            width : bigImageWidth + 'px',
            height: bigImageHeight + 'px',
        });

        this.image_holder_small.css({
            width : smallImageWidth + 'px',
            height: smallImageHeight + 'px',
        });
        _.each(this.bigImages, function (image) {
            image.resize(bigImageWidth, bigImageHeight)
        }, this);
        _.each(this.smallImages, function (image) {
            image.resize(smallImageWidth, smallImageHeight)
        }, this);

        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];
            element.setStartPosition();
        }

    },

    loadBigImages: function () {
        for (var i = 0; i < this.image_holder_big.length; i++) {
            var img = new Image({urls: this.big_image_urls});
            var $holder = $(this.image_holder_big[i]);
            $holder.append(img.$el);

            this.bigImages.push(img);

        }
    },

    loadSmallImages: function () {
        for (var i = 0; i < this.image_holder_small.length; i++) {
            var img = new Image({urls: this.small_image_urls});
            var $holder = $(this.image_holder_small[i]);
            $holder.append(img.$el);
            this.smallImages.push(img);
        }
    },

    hide: function () {

        AppModel.off(null, null, this);
    },

    destroy: function () {

        this.$el.off();
        BaseView.prototype.destroy.apply(this);
    }

});

