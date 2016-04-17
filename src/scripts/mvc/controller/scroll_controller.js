var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var AppModel = require('../model/app_model');
var Router = require('../route/router');
var EventBus = require('EventBus');
var RequestAnimationFrame = require('../../utils/raf');

var controller = {

    init: function () {
        $('body').on('scroll', _.bind(this.onScroll, this));
    },

    onScroll: function (e) {
        console.log(e)
    }

};

controller.init();

module.exports = controller;
