var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
    },

    render: function () {
        this.$el.on('click', _.bind(this.onClick, this));
    },

    onClick: function () {
        EventBus.trigger(EventBus.EVENTS.NAVIGATE, AppModel.PAGES.CLIENTS);
    },

    destroy: function () {
        this.$el.off();
        BaseView.prototype.destroy.apply(this);
    },

});

