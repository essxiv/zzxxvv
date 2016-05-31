var BaseView = require('../base/base_view');
var IdolElement = require('../modules/idol_element');
var TweenMax = require('TweenMax');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({



    initialize: function (options) {

        BaseView.prototype.initialize.apply(this);

        //_.each(this.$('.js-scroll-element'), function (logoElement) {
        //
        //    var element = new IdolElement({el: logoElement});
        //    this.addIdolElement(element);
        //}, this);

    },





    destroy: function () {
        gradientShapes = [];
        this.$el.off();
        AppModel.off(null, null, this);
        BaseView.prototype.destroy.apply(this);
    }

});

