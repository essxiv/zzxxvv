var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

module.exports = BaseView.extend({

    initialWidth : 400,
    initialHeight: 354,
    ratio        : 1,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.$el = $('<img>');
        this.$el.attr('src', options.url[0]);

        this.ratio = this.initialWidth / this.initialHeight;

    },

    resize: function (holderWidth, holderHeight) {

        var newWidth = holderWidth;
        var newHeight = newWidth * this.ratio;
        if (newHeight < holderHeight) {
            newHeight = holderHeight;
            newWidth = newHeight / this.ratio;
        }

        this.$el.css({

            width : newWidth,
            height: newHeight
        });
    }

});

