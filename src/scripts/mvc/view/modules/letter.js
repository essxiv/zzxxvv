var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
    },

    show: function (delay) {

        TweenMax.killTweensOf(this.$el);
        TweenMax.fromTo(this.$el, 0.5,
                        {
                            alpha: 0,
                            y    : -10
                        },
                        {
                            delay: delay,
                            alpha: 1,
                            y    : 0
                        });
    },

    hide: function (delay) {
        TweenMax.killTweensOf(this.$el);
        TweenMax.to(this.$el, 0.5,{
            delay:delay,
            alpha: 0,
            y    : -10
        });

    }

});

