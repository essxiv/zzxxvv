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
        this.$('li').on('click', _.bind(this.onMenuButtonClick, this));
        this.html = $('html');

        TweenMax.set(this.$('.js-menu'), {autoAlpha: 0});
        TweenMax.set(this.$('li'), {alpha: 0});

        AppModel.on('change:pageAtTop', this.onPageChange, this);

    },

    onPageChange: function () {

        var page = AppModel.get('pageAtTop');

        switch (page) {

            case AppModel.PAGES.HERO:
            case AppModel.PAGES.CLIENTS:
            case AppModel.PAGES.PRINCIPALS:
                this.setBlack();
                break;
            case AppModel.PAGES.PORTFOLIO:
                if (!Config.DESKTOP) {
                    this.setWhite();
                } else {
                    this.setBlack();

                }
                break;

            default:
                this.setWhite();
        }

    },

    setBlack: function () {

        this.$('.js-hamburger .hamburger-inner').removeClass('reversed');
    },

    setWhite: function () {

        this.$('.js-hamburger .hamburger-inner').addClass('reversed');
    },

    onClick: function (e) {
        if (this.$('.js-hamburger').hasClass('is-active')) {

            this.hide();
        } else {
            this.show();
        }

    },

    onMenuButtonClick: function (e) {
        var $li = $(e.target);
        var hash = '#' + $li.data().anchor;

        var target = $(hash);
        if (target.length) {
            $('html, body').animate({scrollTop: target.offset().top},
                1000);
        }

        this.hide();
    },

    show: function () {
        this.setWhite();
        this.$el.addClass('full');
        this.$('.js-hamburger').addClass('is-active');
        this.html.addClass('no-scroll');
        TweenMax.to(this.$('.js-menu'), 0.1, {autoAlpha: 1});
        var delay = 0;
        _.each(this.$('li'), function (li) {
            TweenMax.to(li, 0.2, {
                delay: delay,
                alpha: 1,
                x    : 0
            });
            delay += 0.05;
        }, this);
    },

    hide: function (callback) {
        TweenMax.to(this.$('.js-menu'), 0, {autoAlpha: 0, delay: 0});
        TweenMax.to(this.$('li'), 0, {
            delay     : 0,
            alpha     : 0,
            onComplete: callback
        });
        this.determineColor();
        this.$el.removeClass('full');
        this.$('.js-hamburger').removeClass('iscactive');
        this.html.removeClass('no-scroll');
    },

    determineColor: function () {

        this.setBlack();
    }

});

