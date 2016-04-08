var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Model = Backbone.Model.extend({

    PAGES: {
        LOADER    : "PAGE_LOADER",
        HERO      : "HERO",
        MANIFESTO : "MANIFESTO",
        CLIENTS   : "CLIENTS",
        PORTFOLIO : "PORTFOLIO",
        SERVICES  : "SERVICES",
        PRINCIPALS: "PRINCIPALS",
        CONTACT   : "CONTACT"

    },

    defaults: {

        page                 : null,
        pageOptions          : {},
        postLoaderPage       : null,
        postLoaderPageOptions: null

    },

    update: function () {

        this.trigger('request-animation-frame');
    },

});

module.exports = new Model();
