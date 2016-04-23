var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var Image = require('../modules/image');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.$('li').on('click', _.bind(this.onNameClick, this));
        this.$('.info span').addClass('hidden');
    },

    onNameClick: function (e) {
        this.$el.addClass('person-selected');
        var $name = $(e.target);
        var data = $name.data();
        var person = '.' + data.person;
        this.$('span').addClass('hidden');
        this.$('span' + person).removeClass('hidden');


    },

    onResize: function () {
        var padding = 300;
        var textHeight = this.$('.js-copy').height() + padding -this.$('.js-info-holder').height();
        var totalHeight = this.$el.height();
        var offset = totalHeight / 2 - textHeight / 2;

        TweenMax.set(this.$('.js-copy'), {y: offset + padding / 2});
        TweenMax.set(this.$('.js-content'), {height: textHeight});
        TweenMax.set(this.$el, {height: textHeight});

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

