var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var AppModel = require('../model/app_model');
var ScrollModel = require('../model/scroll_model');
var Router = require('../route/router');
var EventBus = require('EventBus');
var RequestAnimationFrame = require('../../utils/raf');

var controller = {

    init: function () {
        Router.on("page", this.onRouterPage, this);
        EventBus.on(EventBus.EVENTS.NAVIGATE, this.onNavigate, this);
        EventBus.on(EventBus.EVENTS.INPUT.CLICK, this.onClick, this);

        RequestAnimationFrame.on('animation_frame', _.bind(this.onUpdate, this));

        ScrollModel.on('change:scroll', this.onScroll, this);
        ScrollModel.on('change:totalHeight', this.onResize, this);
    },

    onScroll: function (model, pct) {


    },

    onResize: function () {

        //calculate all the individual heights of the pages



    },

    onRouterPage: function (page, pageOptions) {

        AppModel.set({
            'page'       : page,
            'pageOptions': pageOptions
        });

    },

    onNavigate: function (id, routeOptions) {

        Router.navigate(id, routeOptions);

    },

    onUpdate: function () {
        AppModel.update();
    },

};

controller.init();

module.exports = controller;
