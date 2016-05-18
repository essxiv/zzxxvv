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

        TweenMax.set(this.$('.js-menu'), {autoAlpha: 0});
        TweenMax.set(this.$('li'), {alpha: 0});

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
    hide: function () {
        TweenMax.to(this.$('.js-menu'), 0.1, {autoAlpha: 0});
        TweenMax.to(this.$('li'), 0.1, {
            delay: 0,
            alpha: 0
        });
        this.determineColor();
        this.$el.removeClass('full');
        this.$('.js-hamburger').removeClass('is-active');
        this.html.removeClass('no-scroll');
    },

    determineColor: function () {

        this.setBlack();
    }

});

