var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        this.$('.js-hamburger').on('click', _.bind(this.onClick, this));
        this.html = $('html');

    },

    setBlack: function () {

        this.$('.js-hamburger .hamburger-inner').removeClass('reversed');
    },

    setWhite: function () {

        this.$('.js-hamburger .hamburger-inner').addClass('reversed');
    },

    onClick: function (e) {
        this.setWhite();
        this.$el.toggleClass('full');
        this.$('.js-hamburger').toggleClass('is-active');
        this.$('.js-menu').toggleClass('is-active');
        this.html.toggleClass('no-scroll');
    }

});

