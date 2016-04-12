var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

module.exports = BaseView.extend({

    initialWidth : 400,
    initialHeight: 354,
    ratio        : 1,
    images       : [],

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        var urls = options.urls;
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
            this.$el.append($img)
        }
        this.$images = this.$('.js-image');
        this.ratio = this.initialWidth / this.initialHeight;

    },

    resize: function (holderWidth, holderHeight) {

        var newWidth = holderWidth;
        var newHeight = newWidth * this.ratio;
        if (newHeight < holderHeight) {
            newHeight = holderHeight;
            newWidth = newHeight / this.ratio;
        }

        var offsetY = -(newHeight - holderHeight) / 2;
        var offsetX = -(newWidth - holderWidth) / 2;

        this.$images.css({

            width        : newWidth,
            height       : newHeight,
            'margin-left': offsetX,
            'margin-top' : offsetY
        });
    }

});

