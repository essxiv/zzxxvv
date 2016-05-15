var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

module.exports = BaseView.extend({
    ids: [],

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        
        this.ids = options.ids;
        this.images = this.$('img');
    },

    showFace: function (faceID) {
        _.each(this.ids, function (id) {
            this.images.addClass('hidden');
            this.images.off();
        }, this);

        var currentFace = this.$('.' + faceID);

        currentFace.one("load", function () {
            // do stuff
            TweenMax.fromTo(this, 0.5, {alpha: 0}, {
                autoAlpha: 1
            });

        }).each(function () {
            if (this.complete) {
                $(this).load();
            }
        });

        currentFace.removeClass('hidden');

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

