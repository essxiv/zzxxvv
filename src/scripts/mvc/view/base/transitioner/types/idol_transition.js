var Backbone = require('backbone');
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

    },

    onResize: function (evt) {
        if (this.currentSection) {
            this.currentSection.onResize(evt);
        }
    },

    //This is a very basic transition,first hide and then show
    show: function (page) {

        var pageId = page;
        //# If the view is already displayed, abort.
        if (this.currentViewId === pageId) {
            return;
        }

        this.newViewId = pageId;

        if (this.currentSection !== null) {
            //hide the currentSection
            this.currentSection.once('hideComplete', this.onSectionHideComplete, this);
            this.currentSection.hide();
        } else {
            //we have no currentSection, so go to the completeHandler
            this.onSectionHideComplete();
        }

    },

    onSectionHideComplete: function () {

        if (this.currentSection) {
            this.currentSection.destroy();

            var currentElementMap = this.elementsMap[this.currentViewId];
            if (currentElementMap.detachElement) {
                currentElementMap.element.detach();
            }
        }

        var currentMap = this.elementsMap[this.newViewId];
        var ViewClass = currentMap.className;

        if (ViewClass) {

            this.currentViewId = this.newViewId;
            this.newViewId = null;

            var createAlready = this.createdPages[this.currentViewId];

            var elementMap = this.elementsMap[this.currentViewId];
            var $element = elementMap.element;
            var $parent = elementMap.parent;

            if (createAlready && this.keepPagesInMemory) {
                this.currentSection = createAlready;
            } else {

                this.currentSection = new ViewClass({
                    el: $element
                });
                //push a reference of the created page so we don't need to recreate pages
                this.createdPages[this.currentViewId] = this.currentSection;
            }
            //render dynamic content
            this.currentSection.render();
            //in case we have dynamic positioning , we call a resize
            this.currentSection.onResize();

            // run show animations
            this.currentSection.show();

        } else {
            throw new Error("View class not found: " + this.currentViewId);
        }
    }

});


