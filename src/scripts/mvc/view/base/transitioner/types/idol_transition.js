var Backbone = require('backbone');
var ScrollModel = require('../../../../model/scroll_model');
var EventBus = require('EventBus');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.View.extend({

    currentSection   : null,
    keepPagesInMemory: true,
    createdPages     : {},
    elementsMap      : {},

    initialize: function (options) {
        this.options = options;
    },

    setMap: function (map) {
        this.elementsMap = map;

        _.each(this.elementsMap, function (currentMap, key) {
            var ViewClass = currentMap.className;
            if (ViewClass) {

                var elementMap = currentMap;
                var $element = elementMap.element;

                var section = new ViewClass({
                    el: $element
                });

                section.render();
                section.onResize();

                //push a reference of the created page so we don't need to recreate pages
                this.createdPages[key] = section;

            }
        }, this);
    },

    onResize: function (evt) {

        _.each(this.createdPages, function (page) {
            page.onResize(evt);
        }, this);
    },

    //This is a very basic transition,first hide and then show
    show: function (page) {


        EventBus.trigger(EventBus.EVENTS.HIDE_CUSTOM_MOUSE);

        var pageId = page;
        //# If the view is already displayed, abort.
        if (this.currentViewId === pageId) {
            return;
        }

        this.newViewId = pageId;

        if (this.currentSection !== null) {
            //hide the currentSection
            this.currentSection.hide();
        }
        this.onSectionHideComplete();

    },

    onSectionHideComplete: function () {

        var currentMap = this.elementsMap[this.newViewId];
        var ViewClass = currentMap.className;

        if (ViewClass) {

            this.currentViewId = this.newViewId;
            this.newViewId = null;

            this.currentSection = this.createdPages[this.currentViewId];

            //in case we have dynamic positioning , we call a resize
            this.currentSection.onResize();

            // run show animations
            this.currentSection.show();

        } else {
            throw new Error("View class not found: " + this.currentViewId);
        }
    }

});


