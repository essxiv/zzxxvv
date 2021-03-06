var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        this.setOffset();

    },

    setOffset: function () {
        this.originalY = this.$el.offset().top;
        TweenMax.set(this.$el, {
            y    : Config.IDOL_ELEMENT_OFFSET,
            alpha: 0
        });

    },

    show: function (time, delay) {

        if (!this.isShowing) {
            this.isShowing = true;
            TweenMax.to(this.$el, time, {
                delay: delay,
                y    : 0,
                alpha: 1
            });
        }

    },

    hide: function (time, delay) {

        if (this.isShowing) {
            this.isShowing = false;
            TweenMax.to(this.$el, time, {
                delay: delay,
                y    : Config.IDOL_ELEMENT_OFFSET,
                alpha: 0
            });
        }

    },

    setStartPosition: function () {
        if (!this.isShowing) {
            this.setOffset();
        }
    }

});

