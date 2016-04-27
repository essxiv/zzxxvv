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


    onCloseClick:function(){
        this.trigger('close');
    },
    show: function () {
        this.$el.on('click', _.bind(this.onCloseClick, this));
        this.$el.removeClass('hidden');
    },

    hide: function () {
        this.$el.off();
        this.$el.addClass('hidden');
    }

});

