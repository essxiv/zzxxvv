var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

//#initialize  your controllers here, they are singeltons
var AppController = require('../controller/application_controller');
var ScrollController = require('../controller/scroll_controller');

//#initialize your models
var AppModel = require('../model/app_model');
var ScrollModel = require('../model/scroll_model');

//#initialize the Router
var Router = require('../route/router');
var Route = require('../route/route');

var EventBus = require('EventBus');

var Transitioner = require('../view/base/transitioner/transitioner');
var DefaultTransition = require('../view/base/transitioner/types/idol_transition');

//#intialize the Pages
var LoaderView = require('../view/pages/loader');
var HeroView = require('../view/pages/hero');
var ManifestoView = require('../view/pages/manifesto');
var ClientsView = require('../view/pages/clients');
var PortfolioView = require('../view/pages/portfolio');
var ServicesView = require('../view/pages/services');
var PrincipalsView = require('../view/pages/principals');
var ContactView = require('../view/pages/contact');
var Footer = require('../view/modules/footer');

var CustomCursorView = require('../view/modules/cursor_view');
var MobileMenu = require('../view/modules/mobile_menu');

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
    className    : LoaderView,
    detachElement: true,
    nodeSelector : '.js-loader'
};

viewMap[AppModel.PAGES.HERO] = {
    className   : HeroView,
    nodeSelector: '.js-hero'
};

viewMap[AppModel.PAGES.MANIFESTO] = {
    className   : ManifestoView,
    nodeSelector: '.js-manifest'
};

viewMap[AppModel.PAGES.CLIENTS] = {
    className   : ClientsView,
    nodeSelector: '.js-clients'
};

viewMap[AppModel.PAGES.PORTFOLIO] = {
    className   : PortfolioView,
    nodeSelector: '.js-portfolio'
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
        ScrollModel.setMap(viewMap);

        this.customCursorView = new CustomCursorView({el: $('.js-cursor-view')});

        this.transitioner = new Transitioner({
            el        : $('.js-app-container-desktop'),
            viewMap   : viewMap,
            transition: new DefaultTransition()
        });

        var footer = new Footer({el: $('.js-footer')});
        var mobileMenu = new MobileMenu({el: $('.js-mobile-menu')});

        this.addEvents();
        this.onResize();

        Router.start();

    },

    addEvents: function () {
        $(window).on('resize', this.onResize);
        this.customCursorView.onResize();
    },

    onResize: function (evt) {
        //TODO: de-bounce this event
        if (this.transitioner) {
            this.transitioner.onResize(evt);

        }
        ScrollController.onResize();
    },

    render: function () {
    }

});