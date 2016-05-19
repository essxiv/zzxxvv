var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var GradientBlob = require('./gradient_blob');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.image = options.image;

    },

    render: function () {

    },

    update: function () {

    },

    show: function (time) {
        TweenMax.to(this.image, time, {
            delay    : 0,
            autoAlpha: 1
        });

    },

    hide: function (time) {
        TweenMax.to(this.image, time, {
            delay    : 0,
            autoAlpha: 0
        });

    },

    resize: function (width, height) {

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

