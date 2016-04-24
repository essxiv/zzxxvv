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

    isDirty    : false,
    pageMap    : null,
    sectionInfo: [],

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

        _.forEach(this.pageMap, function (map, key) {
            var $section = $(map.nodeSelector);
            if ($section.length > 0) {

                var info = this.getSectionInfoByKey(key);//this.sectionInfo[key];

                info.ypos = $section.offset().top;

            }
        }, this);

    },

    getSectionInfoByKey: function (key) {

        for (var i = 0; i < this.sectionInfo.length - 1; i++) {
            var section = this.sectionInfo[i];
            if (section.id === key) {
                return section;
            }
        }

        var newEntry = {
            id: key
        };

        this.sectionInfo.push(newEntry);

        return newEntry;

    },

    onScroll: function () {

        this.isDirty = true;
    },

    onUpdatedScroll: function () {

        var scrollY = ScrollModel.get('scroll') * (ScrollModel.get('totalHeight') - $(window).height());
        scrollY += window.innerHeight / 2;

        for (var i = 0; i < this.sectionInfo.length; i++) {
            var section = this.sectionInfo[i];
            var nextSection = this.sectionInfo[i + 1];
            if (nextSection) {

                if (scrollY >= section.ypos && scrollY < nextSection.ypos) {
                    EventBus.trigger(EventBus.EVENTS.NAVIGATE, section.id);
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
