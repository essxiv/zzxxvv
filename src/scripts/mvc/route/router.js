var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;


var Router = Backbone.Router.extend({

    page       : null,
    pageOptions: null,
    routes     : null,

    /**

     usage:
     var options = new RouteOptions();
     options.pageOptions = {
                property_1: 'hello',
                property_2: 'world'
              };
     Router.navigate(AppModel.PAGES.PAGE, options);

     */

    initialize: function (options) {

        this.on('route', this.onRouteChange, this);
    },

    createRoutes: function (routes) {

        this.routes = routes;
        _.each(routes, function (route) {

            var fragments = route.fragments;
            for (var i = 0; i < fragments.length; i++) {
                var fragment = fragments[i];
                this.route(fragment, route.id);
            }

        }, this);

    },

    start: function () {
        Backbone.history.start();

    },

    onRouteChange: function (page, options) {
        var routeObject = this.getRoute(page);
        options = routeObject.fromURL(options);
        this._setPage(page, options);
    },

    _setPage: function (page, options) {

        this.page = page;
        this.pageOptions = options;
        this.trigger('page', page, options);

    },

    navigate: function (id, routeOptions) {

        var defaultOptions = {
            triggerRoute: true,
            updateURL   : true
        };

        if (!routeOptions) {
            routeOptions = {};
        }
        var pageOptions = routeOptions.pageOptions;

        _.defaults(routeOptions, defaultOptions);

        routeOptions.triggerRoute = routeOptions.triggerRoute === false ? false : true;
        routeOptions.updateURL = routeOptions.updateURL === false ? false : true;

        var route = this.getRoute(id);
        var fragment = route.getFragment();
        if (pageOptions) {
            //#parse URL
            fragment = fragment + '/' + route.toURL(pageOptions);
        }

        if (routeOptions.updateURL) {
            return Backbone.Router.prototype.navigate.call(this, fragment, routeOptions.triggerRoute);
        } else {
            this._setPage(id, pageOptions);
        }
    },

    getRoute: function (id) {
        var routeWithID = _.where(this.routes, {id: id});

        if (routeWithID.length === 0) {
            throw Error('You requested a page without a valid routeID: ' + id);
        }

        var route = routeWithID[0];

        return route;
    },

});

module.exports = new Router();
