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

        this.$('.js-close').on('click', _.bind(this.onBackClick, this));

        this.$('.js-contact-link').on('click', _.bind(this.onStartConversationClick, this));
        this.$('.js-foster-link ').on('click', _.bind(this.onFosterClick, this));
    },

    show: function () {
        this.setState("DEFAULT");

    },

    onBackClick: function () {
        this.setState("DEFAULT");

    },

    setState: function (state) {

        if (this.state !== state) {
            this.state = state;

            if (this.currentScreen) {
                this.currentScreen.hide();
            }

            this.$el.off();
            switch (state) {
                case "CONTACT":
                    this.currentScreen = this.contactScreen;
                    break;
                case "FOSTER":
                    this.currentScreen = this.fosterScreen;
                    break;

                default:
                    this.currentScreen = this.mainScreen;

            }

            this.currentScreen.show()
        }
    },

    onFosterClick           : function (e) {

        this.setState("FOSTER");
    },
    onStartConversationClick: function (e) {

        this.setState("CONTACT");
    }
});

