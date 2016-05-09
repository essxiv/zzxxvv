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
            this.addIdolElement(element);
        }, this);

    },

    show: function () {

    },

    hide: function () {

        AppModel.off(null, null, this);
    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);
    },

});

