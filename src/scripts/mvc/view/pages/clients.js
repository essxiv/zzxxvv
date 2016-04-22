var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    svgIDs: [],
    logos : [],

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

    },

    render: function () {
        //var symbols = $('symbol');
        //_.each(symbols, function (s) {
        //    var $s = $(s);
        //    var id = $s.attr('id');
        //    if (id.indexOf('client_') > -1 && this.svgIDs.indexOf(id) === -1) {
        //        this.svgIDs.push(id);
        //    }
        //}, this);
        //
        //_.each(this.svgIDs, function (id) {
        //
        //    console.log(' <svg class="client"><use xlink:href="#' + id + '"/></svg>');
        //
        //}, this);

        this.logos=$('.client');

        this.$el.on('click', _.bind(this.onClick, this));

    },

    onClick:function(){
        EventBus.trigger(EventBus.EVENTS.NAVIGATE, AppModel.PAGES.PORTFOLIO);
    },

    onResize: function () {
        var height = window.innerHeight;
        var width = this.$('.js-content').width();
        var defaultwidth = 157;
        var defaultHeight = 154;
        var ratio = defaultHeight / defaultwidth;
        var amountOfLogos = this.logos.length;

        //TODO: padding depends on screensize
        var padding = 40;
        var maxHeight = 100;
        var columns = 5;

        if (width < 768) {
            padding = 20
        }

        var newWidth = ((width - ((columns * 2) * padding)) / columns);

        _.each(this.logos, function (node) {

            $(node).css({
                height         : 100 / (columns) + '%',
                width          : newWidth,
                'max-height'   : maxHeight + 'px',
                //'max-width'   : 100 + 'px',
                'padding-left' : padding + 'px',
                'padding-right': padding + 'px',

            });
        });

        var textHeight = this.$('.js-logos').height();
        var padding = 0;
        var totalHeight =(textHeight > window.innerHeight) ? textHeight + padding : window.innerHeight;
        var offset = ((totalHeight - padding / 2) - textHeight) / 2;

        TweenMax.set(this.$('.js-logos'), {y: offset});
        TweenMax.set(this.$('.js-content'), {height: totalHeight});


        if (this.$('.js-content').height() >height) {
            this.$('.js-content').removeClass('high');
            this.$('.js-content').addClass('low');
            //this.$el.addClass('scroll');

        } else {
            this.$('.js-content').addClass('high');
            this.$('.js-content').removeClass('low');
            //this.$el.removeClass('scroll');
        }

    },

    destroy: function () {
        this.$el.off();
        //this.$('.js-content').empty();
        this.svgIDs = [];
        this.logos = [];

        BaseView.prototype.destroy.apply(this);

    },

});

