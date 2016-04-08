var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

//#initialize  your controllers here, they are singeltons
var AppController = require('../controller/application_controller');

//#initialize your models
var AppModel = require('../model/app_model');

//#initialize the Router
var Router = require('../route/router');
var Route = require('../route/route');

var EventBus = require('EventBus');

var Transitioner = require('../view/base/transitioner/transitioner');
var DefaultTransition = require('../view/base/transitioner/types/default_transition');

//#intialize the Pages
var LoaderView = require('../view/pages/loader');
var HeroView = require('../view/pages/hero');
var ManifestoView = require('../view/pages/manifesto');
var ClientsView = require('../view/pages/clients');
var PortfolioView = require('../view/pages/portfolio');
var ServicesView = require('../view/pages/services');
var PrincipalsView = require('../view/pages/principals');
var ContactView = require('../view/pages/contact');
var Footer= require('../view/modules/footer');

Router.createRoutes([

    new Route([""], AppModel.PAGES.HERO),
    new Route(["manifesto"], AppModel.PAGES.MANIFESTO),
    new Route(["clients"], AppModel.PAGES.CLIENTS),
    new Route(["portfolio"], AppModel.PAGES.PORTFOLIO),
    new Route(["services"], AppModel.PAGES.SERVICES),
    new Route(["principals"], AppModel.PAGES.PRINCIPALS),
    new Route(["contact"], AppModel.PAGES.CONTACT),

]);

var viewMap = {};

viewMap[AppModel.PAGES.LOADER] = {
    className   : LoaderView,
    nodeSelector: '.js-loader'
};

viewMap[AppModel.PAGES.HERO] = {
    className   : HeroView,
    nodeSelector: '.js-hero'
};

viewMap[AppModel.PAGES.MANIFESTO] = {
    className   : ManifestoView,
    nodeSelector: '.js-manifesto'
};

viewMap[AppModel.PAGES.CLIENTS] = {
    className   : ClientsView,
    nodeSelector: '.js-clients'
};

viewMap[AppModel.PAGES.PORTFOLIO] = {
    className   : PortfolioView,
    nodeSelector: '.js-clients'
};

viewMap[AppModel.PAGES.SERVICES] = {
    className   : ServicesView,
    nodeSelector: '.js-services'
};

viewMap[AppModel.PAGES.PRINCIPALS] = {
    className   : PrincipalsView,
    nodeSelector: '.js-principals'
};

viewMap[AppModel.PAGES.CONTACT] = {
    className   : ContactView,
    nodeSelector: '.js-contact'
};


module.exports = Backbone.View.extend({
    transitioner: null,

    initialize: function () {
        _.bindAll(this, 'onResize');
        this.start();
    },

    start: function () {

        $('.js-app-container-desktop').removeClass('hidden');

        this.transitioner = new Transitioner({
            el        : $('.js-app-container-desktop'),
            viewMap   : viewMap,
            transition: new DefaultTransition()
        });

        var footer= new Footer({el:$('.js-footer')})

        this.addEvents();

        Router.start();

    },

    addEvents: function () {
        $(window).on('resize', this.onResize);

    },

    onResize: function (evt) {
        if (this.transitioner) {
            this.transitioner.onResize(evt);
        }
    },

    render: function () {
    }

});