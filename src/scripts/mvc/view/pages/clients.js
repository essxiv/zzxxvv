var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
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
        var symbols = $('symbol');
        _.each(symbols, function (s) {
            var $s = $(s);
            var id = $s.attr('id');
            if (id.indexOf('client_') > -1 && this.svgIDs.indexOf(id) === -1) {
                this.svgIDs.push(id);
            }
        }, this);

        _.each(this.svgIDs, function (id) {
            var node = $(' <svg class="client"><use xlink:href="#' + id + '"/></svg>');
            this.logos.push(node);
            this.$('.js-content').append(node);
        }, this);

    },

    onResize: function () {
        var height = window.innerHeight;
        var width = this.$('.js-content').width();
        var defaultwidth = 157;
        var defaultHeight = 154;
        var ratio = defaultHeight / defaultwidth;
        var amountOfLogos = this.logos.length;
        var padding = 20;

        var columns = 5;
        var rows = Math.ceil(amountOfLogos / columns);
        var newWidth = ((width - ((columns * 2) * padding)) / columns);
        var newHeight = newWidth / ratio;
        console.log('---')
        console.log(rows);
        console.log(newHeight);
        console.log(defaultHeight * rows + '   ' + window.innerHeight);
        console.log('---');

        _.each(this.logos, function (node) {

            node.css({
                width          : newWidth,
                height         : newHeight,
                'padding-left' : padding + 'px',
                'padding-right': padding + 'px',

            });
        });

    },

    destroy: function () {
        this.$el.off();
        this.$('.js-content').empty();
        this.svgIDs = [];
        this.logos = [];

        BaseView.prototype.destroy.apply(this);

    },

});

