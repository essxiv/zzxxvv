var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var IdolElement = require('../modules/idol_element');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.title = this.$('.js-title');
        this.copy = this.$('.js-copy');

        this.elements = [];

        _.each([this.title, this.copy], function (logoElement) {

            var element = new IdolElement({el: logoElement});
            this.elements.push(element);
        }, this);

         AppModel.on('request-animation-frame', this.onUpdate, this);
    },

    onUpdate: function () {

        var scrollPosition = $(window).scrollTop();
        var offset = window.innerHeight/2;

        for (var i = 0; i < this.elements.length; i++) {

            var element = this.elements[i];
            if (element.originalY < scrollPosition + offset) {
                element.show(0.5, 0);
            }

        }

    },

    show: function () {

    },

    hide: function () {


    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);
    },

});

