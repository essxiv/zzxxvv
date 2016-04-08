var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.View.extend({

    render: function () {

        //    add rendered content here
    },

    show: function () {
    },

    hide: function () {

        this.onHideComplete();

    },

    onHideComplete: function () {
        this.trigger('hideComplete');
    },

    onResize: function (evt) {

    },

    destroy: function () {
        this.stopListening();
        this.off();
    }
});
