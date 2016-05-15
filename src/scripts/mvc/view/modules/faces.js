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

    showFace: function (faceID) {
        _.each(this.ids, function (id) {
            this.$el.removeClass(id);
        }, this);

        this.$el.addClass(faceID);

        TweenMax.to(this.$el, 0.5, {
            autoAlpha: 1
        });
    },

    hide: function (time) {
        TweenMax.to(this.el, time, {
            autoAlpha: 0
        });
    },

    resize: function (holderWidth, holderHeight) {

    }

});

