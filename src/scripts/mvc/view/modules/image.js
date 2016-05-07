var BaseView = require('../base/base_view');
var IdolElement = require('../modules/idol_element');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

module.exports = IdolElement.extend({

    initialWidth : null,
    initialHeight: null,
    ratio        : 1,
    images       : [],

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.images = [];
        this.ratio = 1;
        this.isHero = false;

        this.initialWidth = options.initialWidth;
        this.initialHeight = options.initialHeight;
        var offset = options.offset;

        var urls = options.urls;
        this.test = urls;
        this.log = options.log;

        this.isHero = options.isHero;
        console.log(this.isHero);

        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            var $img = $('<img class="js-image">');

            $img.one("load", function () {
                // do stuff

            }).each(function () {
                if (this.complete) {
                    $(this).load();
                }
            });

            $img.attr('src', url);
            this.images.push($img);
        }

        var img = this.images[offset];
        this.$el.append(img);
        this.$el.css({height: '100%'});
        this.$images = this.$('.js-image');
        this.ratio = this.initialWidth / this.initialHeight;

        this.currentImage = this.images[offset];
        this.currentImageIndex = offset;

    },

    start: function (delay) {

        //this.showSlide(delay);

    },

    showSlide: function (delay) {
        this.currentImageIndex++;
        if (this.currentImageIndex > this.images.length - 1) {
            this.currentImageIndex = 0;
        }
        var that = this;
        var newImage = this.images[this.currentImageIndex];
        TweenMax.set(newImage, {alpha: 0});
        var time = 0.5
        TweenMax.to(newImage, time, {

            delay     : time + delay,
            alpha     : 1,
            onComplete: _.bind(function () {
                (this.currentImage).remove();
                this.currentImage = newImage;
                this.showSlide(5);
            }, that)
        });
        this.$el.append(newImage);
        this.$images = this.$('.js-image');
        this.resizeImages();

    },

    resize: function (holderWidth, holderHeight) {

        this.holderWidth = holderWidth;
        this.holderHeight = holderHeight;

        this.resizeImages();
    },

    resizeImages: function () {
        var newWidth = this.holderWidth;
        var newHeight = newWidth / this.ratio;
        var tooBig = false;
        if (newHeight < this.holderHeight) {
            newHeight = this.holderHeight;
            newWidth = newHeight * this.ratio;
            tooBig = true;
        }

        var object = {
            url          : this.test[0],
            holderWidth  : this.holderWidth,
            holderHeight : this.holderHeight,
            newWidth     : newWidth,
            newHeight    : newHeight,
            tooBig       : tooBig,
            initialWidth : this.initialWidth,
            initialHeight: this.initialHeight,
            ratio        : this.ratio

        }

        if (this.log) {

            console.log(object)
        }

        var offsetY = (newHeight - this.holderHeight) / 2;
        var offsetX = -(newWidth - this.holderWidth) / 2;
        if (!tooBig) {

            this.$images.css({
                height       : newHeight,
                width        : newWidth,
                'margin-left': 0,
                'margin-top' : 0
            });
        }
        else {
            this.$images.css({

                width        : newWidth,
                height       : newHeight,
                'margin-left': offsetX,
                'margin-top' : 0
            });

        }
        this.setStartPosition();

    }

});

