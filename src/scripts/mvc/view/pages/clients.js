var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    svgIDs        : [],
    logos         : [],

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

    },

    render: function () {
        var symbols = $('symbol');
        _.each(symbols, function (s) {
            var $s = $(s);
            var id = $s.attr('id');
            if (id.indexOf('client_') > -1 && this.svgIDs.indexOf(id) === -1) {
                this.svgIDs.push(id);
            }
        }, this);

        _.each(this.svgIDs, function (id) {
            var node = $(' <svg class="client"><use xlink:href="#' + id + '"/></svg>');
            this.logos.push(node);
            this.$('.js-content').append(node);
        }, this);

    },

    destroy: function () {
        this.$el.off();
        this.$('.js-content').empty();
        this.svgIDs = [];
        this.logos = [];

        BaseView.prototype.destroy.apply(this);

    },

});

