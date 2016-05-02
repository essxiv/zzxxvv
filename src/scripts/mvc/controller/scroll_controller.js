var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var AppModel = require('../model/app_model');
var ScrollModel = require('../model/scroll_model');
var Router = require('../route/router');
var EventBus = require('EventBus');

//TODO: this is a view, not a cotroller
var controller = {

    isDirty: false,

    init: function () {
        var scrollCallback = _.bind(this.onScroll, this);
        window.onscroll = function () {
            scrollCallback();
        };

        AppModel.on('request-animation-frame', this.onUpdate, this);
        ScrollModel.on('change:scroll', this.onUpdatedScroll, this);

    },

    onResize: function () {

        ScrollModel.set('totalHeight', $(document).height());
        ScrollModel.updateSectionMapping();

    },

    onScroll: function () {

        this.isDirty = true;
    },

    onUpdatedScroll: function () {

        var scrollY = ScrollModel.get('scroll') * (ScrollModel.get('totalHeight') - $(window).height());
        var base = scrollY;
        scrollY += window.innerHeight / 2;
        var sectionInfo = ScrollModel.sectionInfo;

        for (var i = 0; i < sectionInfo.length; i++) {
            var section = sectionInfo[i];
            var nextSection = sectionInfo[i + 1];
            if (nextSection) {

                if (scrollY >= section.ypos && scrollY <= nextSection.ypos) {

                    if (section.id === AppModel.PAGES.HERO) {
                        if (base === 0) {
                            console.log('YEAAAH')
                        EventBus.trigger(EventBus.EVENTS.NAVIGATE, section.id);
                        }

                    } else {

                        EventBus.trigger(EventBus.EVENTS.NAVIGATE, section.id);
                    }
                    return;
                }
            } else {
                if (scrollY >= section.ypos) {
                    EventBus.trigger(EventBus.EVENTS.NAVIGATE, section.id);
                    return;
                }
            }
        }
    },

    onUpdate: function (e) {

        if (this.isDirty) {
            this.isDirty = false;
            //TODO:optimize the height
            var scrollPercent = $(window).scrollTop() / (ScrollModel.get('totalHeight') - $(window).height());

            ScrollModel.set('scroll', scrollPercent);
        }

    }

};

controller.init();

module.exports = controller;
