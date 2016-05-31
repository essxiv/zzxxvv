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

    big_image_urls: [
        {
            log          : false,
            initialWidth : 572,
            initialHeight: 541,
            images       : [

                Config.CDN + '/assets/images/portfolio/top_1_0.jpg',
                Config.CDN + '/assets/images/portfolio/top_1_1.jpg',
                Config.CDN + '/assets/images/portfolio/top_1_2.jpg'
            ]
        },

        {
            log          : false,
            isHero       : true,
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
        {
            initialWidth : 400,
            initialHeight: 428,
            images       : [

                Config.CDN + '/assets/images/portfolio/bottom_1_0.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_1_1.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_1_2.jpg',
            ]
        },

        {
            log          : false,
            initialWidth : 400,
            initialHeight: 428,
            images       : [

                Config.CDN + '/assets/images/portfolio/bottom_2_0.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_2_1.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_2_2.jpg',
            ]
        },
        {
            initialWidth : 400,
            initialHeight: 428,
            images       : [

                Config.CDN + '/assets/images/portfolio/bottom_3_0.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_3_1.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_3_2.jpg'
            ]
        },
        {
            initialWidth : 400,
            initialHeight: 428,
            images       : [

                Config.CDN + '/assets/images/portfolio/bottom_4_0.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_4_1.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_4_2.jpg',
            ]
        },
        {
            initialWidth : 400,
            initialHeight: 428,
            images       : [

                Config.CDN + '/assets/images/portfolio/bottom_5_0.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_5_1.jpg',
                Config.CDN + '/assets/images/portfolio/bottom_5_2.jpg',
            ]
        }

    ],

    smallImages: [],
    bigImages  : [],

    image_holder_big  : null,
    image_holder_small: null,
    holder            : null,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.holder = this.$('.js-content');
        if (!Config.DESKTOP) {
            this.$('.js-item.big').removeClass('big').addClass('small');
            this.$('.js-item.small.hero').removeClass('small').addClass('big');
            this.holder.prepend(this.$('.js-item.big.hero'));
        }

        this.image_holder_big = this.$('.js-item.big');
        this.image_holder_hero = this.$('.js-item.big.hero');
        this.image_holder_small = this.$('.js-item.small');
        this.elements = [];
        this.loadBigImages();
        this.loadSmallImages();

    },

    onIdolElementsUpdate: function () {

        var scrollPosition = $(window).scrollTop();
        var offset = window.innerHeight;

        var inRange = [];
        for (var i = 0; i < this.idolElements.length; i++) {

            var element = this.idolElements[i];
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

    onMouseOver: function (e) {
        var img = e.currentTarget;
        var scale = 0.7;
        TweenMax.to(img, 1, {
            scaleX: scale,
            scaleY: scale
        });
    },

    onMouseOut: function (e) {
        var img = e.currentTarget;
        var scale = 1;
        TweenMax.to(img, 0.5, {
            scaleX: scale,
            scaleY: scale
        });
    },

    onResize: function () {

        var heroWidth = 0.4;
        var amountInrow = this.image_holder_small.length;
        var bigImageHeight = 0.6 * this.holder.height();
        var smallImageHeight = 0.4 * this.holder.height();

        if (window.innerWidth <= 375) {

            heroWidth = 1;
            var heroPct = 0.45;
            bigImageHeight = heroPct * this.holder.height();
            smallImageHeight = ((1 - heroPct) / 3) * this.holder.height();
            amountInrow = 2;

        }
        var normalWidth = (1 - heroWidth) / (this.image_holder_big.length - 1);

        var bigImageWidth = normalWidth * this.holder.width();
        var bigHeroImageWidth = heroWidth * this.holder.width();
        var smallImageWidth = (1 / amountInrow) * this.holder.width();

        this.image_holder_big.css({
            width : bigImageWidth + 'px',
            height: bigImageHeight + 'px',
        });

        this.image_holder_hero.css({
            width: bigHeroImageWidth + 'px'
        });

        this.image_holder_small.css({
            width : smallImageWidth + 'px',
            height: smallImageHeight + 'px',
        });
        _.each(this.bigImages, function (image) {
            if (image.isHero) {
                image.resize(bigHeroImageWidth, bigImageHeight);
            } else {

                image.resize(bigImageWidth, bigImageHeight);
            }
        }, this);

        _.each(this.smallImages, function (image) {
            image.resize(smallImageWidth, smallImageHeight);
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
            var log = details.log;
            var isHero = details.isHero;

            var img = new Image({
                urls         : details.images,
                offset       : 0,
                log          : log,
                isHero       : isHero,
                initialWidth : initialWidth,
                initialHeight: initialHeight
            });
            var $holder = $(this.image_holder_big[i]);
            $holder.append(img.$el);
            img.setOffset();

            this.bigImages.push(img);
            this.addIdolElement(img);
        }
    },

    loadSmallImages: function () {

        //var initialWidth = 400;
        //var initialHeight = 428;

        var offset = 0;
        var counter = 0;

        for (var i = 0; i < this.image_holder_small.length; i++) {
            var urls = this.small_image_urls;
            if (counter >= this.small_image_urls.length) {
                counter = 0;
                urls = this.big_image_urls;
            }

            var details = urls[counter];
            var initialWidth = details.initialWidth;
            var initialHeight = details.initialHeight;
            var log = details.log;
            var isHero = details.isHero;

            var img = new Image({
                urls         : details.images,
                offset       : 0,
                log          : log,
                isHero       : isHero,
                initialWidth : initialWidth,
                initialHeight: initialHeight
            });

            offset++;
            var $holder = $(this.image_holder_small[i]);
            $holder.append(img.$el);
            img.setOffset();

            this.smallImages.push(img);

            this.addIdolElement(img);
            counter++;

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

