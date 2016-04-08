var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

Backbone.$ = $;


var AppModel = require('../../../model/app_model');

module.exports = Backbone.View.extend({

    currentTransitioner: null,
    elementsMap        : null,

    initialize: function (options) {
        this.options = options;
        this.evaluateOptions(options);

        this.elementsMap = this.createMap(this.options.viewMap);
        this.currentTransitioner = this.options.transition;

        if (!this.currentTransitioner) {
            throw new Error(' Transition needs to have a transitioner');
        }
        this.currentTransitioner.setMap(this.elementsMap);

        AppModel.on("change:page", this.onAppModelPage, this);
    },

    evaluateOptions: function (options) {
        var required = [
            'viewMap',
            'transition'
        ];
        _.each(required, function (item, index) {
            if (!_.has(this.options, item)) {
                throw new Error(item + " option not set");
            }
        }, this);
    },

    createMap: function (viewMap) {
        var elementsMap = {};
        _.each(viewMap, function (routeObject, id) {

            if (!routeObject.className || !routeObject.nodeSelector) {
                throw new Error("RouteObject missing options: " + id);
            }

            var className = routeObject.className;
            var $element = this.$(routeObject.nodeSelector);
            var $parent = $element.parent();

            elementsMap[id] = {
                element  : $element,
                parent   : $parent,
                className: className
            };

        }, this);
        return elementsMap;
    },

    onResize: function (evt) {
        if (this.currentTransitioner) {
            this.currentTransitioner.onResize(evt);
        }
    },

    //let the active transitioner show the new page
    onAppModelPage: function (model, page) {
        this.currentTransitioner.show(page);
    }

});
