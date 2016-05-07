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
        {
            log          : true,
            initialWidth : 572,
            initialHeight: 541,
            images       : [

                Config.CDN + '/assets/images/portfolio/top_1_0.jpg',
                Config.CDN + '/assets/images/portfolio/top_1_1.jpg',
                Config.CDN + '/assets/images/portfolio/top_1_2.jpg'
            ]
        },

        {
            log          : true,
            initialWidth : 856,
            initialHeight: 541,
            images       : [

                Config.CDN + '/assets/images/portfolio/top_2_0.jpg',
                Config.CDN + '/assets/images/portfolio/top_2_1.jpg',
                Config.CDN + '/assets/images/portfolio/top_2_2.jpg'
            ]
        },
        {
            initialWidth : 572,
            initialHeight: 541,
            images       : [

                Config.CDN + '/assets/images/portfolio/top_3_0.jpg',
                Config.CDN + '/assets/images/portfolio/top_3_1.jpg',
                Config.CDN + '/assets/images/portfolio/top_3_2.jpg'
            ]
        }

    ],
    small_image_urls: [
        Config.CDN + '/assets/images/portfolio/bottom_1_0.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_1_1.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_1_2.jpg',

        Config.CDN + '/assets/images/portfolio/bottom_2_0.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_2_1.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_2_2.jpg',

        Config.CDN + '/assets/images/portfolio/bottom_3_0.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_3_1.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_3_2.jpg',

        Config.CDN + '/assets/images/portfolio/bottom_4_0.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_4_1.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_4_2.jpg',

        Config.CDN + '/assets/images/portfolio/bottom_5_0.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_5_1.jpg',
        Config.CDN + '/assets/images/portfolio/bottom_5_2.jpg',
    ],
    smallImages     : [],
    bigImages       : [],

    image_holder_big  : null,
    image_holder_small: null,
    holder            : null,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.image_holder_big = this.$('.js-item.big');
        this.image_holder_small = this.$('.js-item.small');
        this.holder = this.$('.js-content');
        this.elements = [];
        this.loadBigImages();
        this.loadSmallImages();

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
                inRangeElement.start(delay);

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

            var details = this.big_image_urls[i];
            var initialWidth = details.initialWidth;
            var initialHeight = details.initialHeight;
            var log = details.log

            var img = new Image({
                urls         : details.images,
                offset       : i,
                log          : log,
                initialWidth : initialWidth,
                initialHeight: initialHeight
            });
            var $holder = $(this.image_holder_big[i]);
            $holder.append(img.$el);
            img.setOffset();

            this.bigImages.push(img);
            this.elements.push(img);

        }
    },

    loadSmallImages: function () {

        var initialWidth = 400;
        var initialHeight = 428;
        for (var i = 0; i < this.image_holder_small.length; i++) {
            var img = new Image({
                urls         : this.small_image_urls,
                offset       : i,
                initialWidth : initialWidth,
                initialHeight: initialHeight
            });
            var $holder = $(this.image_holder_small[i]);
            $holder.append(img.$el);

            this.smallImages.push(img);
            this.elements.push(img);
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

