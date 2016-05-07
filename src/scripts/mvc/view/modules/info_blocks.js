var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

module.exports = BaseView.extend({
    ids: [],
    //map: {},

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.ids = options.ids;
    },

    showTitle: function () {

        this.$el.removeClass('hidden');
    },

    hide: function () {
        this.hideAllBlocks();
    },

    hideAllBlocks: function () {
        _.each(this.ids, function (id) {
            this.$('.' + id).addClass('hidden');
        }, this);
    },

    hideTitle: function () {

        this.$el.addClass('hidden');
    },

    show: function (person) {

        this.hideAllBlocks();

        this.$('.' + person).removeClass('hidden');

        TweenMax.to(this.$('.' + person), 0, {
            opacity: 0
        });
        TweenMax.to(this.$('.' + person), 1, {
            opacity: 1
        });
    },

    resize: function (holderWidth, holderHeight) {

    }

});

