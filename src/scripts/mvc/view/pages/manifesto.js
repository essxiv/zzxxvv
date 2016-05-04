var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.title = this.$('.js-title');
        this.copy = this.$('.js-copy');

        TweenMax.set(this.title,{alpha:0});
        TweenMax.set(this.copy,{alpha:0});
    },

    render: function () {
    },

    show: function () {

        var delay = 0;
        var time = 0.5;
        TweenMax.killTweensOf(this.title);
        TweenMax.killTweensOf(this.copy);

        var startProps = {
            alpha: 0,
            y    : -10
        };

        TweenMax.fromTo(this.title, time,
                        startProps,
                        {
                            delay: delay,
                            alpha: 1,
                            y    : 0
                        });

        TweenMax.fromTo(this.copy, time,
                        startProps,
                        {
                            delay: delay + time,
                            alpha: 1,
                            y    : 0
                        });

    },

    hide: function () {
        TweenMax.killTweensOf(this.title);
        TweenMax.killTweensOf(this.copy);

        var time = 0.5;

        TweenMax.to(this.title, time, {alpha: 0});
        TweenMax.to(this.copy, time, {alpha: 0});

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);
    },

});

