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

        var $name = $(e.currentTarget);
        var data = $name.data();
        var person = '.' + data.person;

        this.$el.addClass('person-selected');
        this.$('span').addClass('hidden');
        this.$('.js-names').addClass('hidden');
        this.$('.js-mugshot').addClass(data.person)

        this.$('span' + person).removeClass('hidden');
        this.$('.mugshot').removeClass('hidden');
        this.$('.js-info-holder').removeClass('hidden');
        this.$('.js-title').removeClass('pink');

        this.$el.on('mousedown', _.bind(this.onExitClick, this));
    },

    onExitClick: function () {

        console.log('yes')
        this.$el.removeClass('person-selected');
        this.$('.js-names').removeClass('hidden');
        this.$('span').removeClass('hidden');

        this.$('.js-mugshot').removeClass('matt josh scott brad abe');

        this.$('js-info-holder span').addClass('hidden');
        this.$('.mugshot').addClass('hidden');
        this.$('.js-info-holder').addClass('hidden');
        this.$('.js-title').addClass('pink');

        this.$el.off('mousedown');
        TweenMax.set($('.js-swiper'), {
            width: 0,
            x    : 0
        });

    },

    onResize: function () {
        var padding = 300;
        var textHeight = this.$('.js-copy').height() + padding;
        var totalHeight = this.$el.height();
        var offset = totalHeight / 2 - textHeight / 2;
        var ypos = offset + padding / 2;

        TweenMax.set(this.$('.js-info-holder'), {y: ypos});
        TweenMax.set(this.$('.js-copy'), {y: ypos});
        TweenMax.set(this.$('.js-content'), {height: textHeight});
        TweenMax.set(this.$el, {height: textHeight});

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

