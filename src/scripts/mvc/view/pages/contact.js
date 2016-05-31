var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var PopUp = require('../modules/popup');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        this.mainScreen = new PopUp({el: this.$('.js-main')});
        this.contactScreen = new PopUp({el: this.$('.js-contact')});
        this.fosterScreen = new PopUp({el: this.$('.js-foster')});

        this.fosterScreen.on('close', _.bind(function () {
            this.setState('DEFAULT');
        }, this));

        if (!Config.DESKTOP) {
            this.mainScreen.hide();
        }

        this.$('.js-close').on('click', _.bind(this.onBackClick, this));
        this.$('.js-contact-link').on('click', _.bind(this.onStartConversationClick, this));
        this.$('.js-foster-link ').on('click', _.bind(this.onFosterClick, this));

        var areas = [
            this.$('a'),
            this.$('.js-foster-link'),
            this.$('.js-contact'),
            this.$('.container'),
            //this.$('.js-foster')
        ];

        for (var i = 0; i < areas.length; i++) {
            var area = $(areas[i]);
            area.on('mouseover', _.bind(this.onButtonMouseOver, this));
            area.on('mouseout', _.bind(this.onButtonMouseOut, this));

        }
    },

    show: function () {

        this.setState("DEFAULT");

    },

    onButtonMouseOver: function () {

        EventBus.trigger(EventBus.EVENTS.HIDE_CUSTOM_MOUSE);
    },
    onButtonMouseOut : function () {
        if (this.state !== 'DEFAULT') {

            EventBus.trigger(EventBus.EVENTS.SHOW_CUSTOM_MOUSE);
        }
    },

    onBackClick: function () {
        this.setState("DEFAULT");

    },

    setState: function (state) {

        if (!Config.DESKTOP && state === 'DEFAULT') {

            state = 'CONTACT';
        }
        if (this.state !== state) {
            this.state = state;

            if (this.currentScreen) {
                this.currentScreen.hide();
            }
            //this.$el.off();
            switch (state) {
                case "CONTACT":
                    this.currentScreen = this.contactScreen;
                    EventBus.trigger(EventBus.EVENTS.SHOW_CUSTOM_MOUSE);
                    break;
                case "FOSTER":
                    this.currentScreen = this.fosterScreen;
                    EventBus.trigger(EventBus.EVENTS.SHOW_CUSTOM_MOUSE);
                    break;

                default:
                    this.currentScreen = this.mainScreen;
                    EventBus.trigger(EventBus.EVENTS.HIDE_CUSTOM_MOUSE);

            }

            this.currentScreen.show();
        }
    },

    onFosterClick           : function (e) {

        this.setState("FOSTER");
    },
    onStartConversationClick: function (e) {

        this.setState("CONTACT");
    }
});

