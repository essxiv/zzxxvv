var Backbone = require('backbone');
var AppModel = require('../../model/app_model');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function (options) {
        Backbone.View.prototype.initialize.apply(this);
        this.idolElements = [];
        AppModel.on('request-animation-frame', this.onIdolElementsUpdate, this);

    },

    render: function () {

        //    add rendered content here
    },

    addIdolElement: function (idolElement) {
        this.idolElements.push(idolElement);

    },

    onIdolElementsUpdate: function () {

        var scrollPosition = $(window).scrollTop();
        var offset = window.innerHeight / 2;

        for (var i = 0; i < this.idolElements.length; i++) {

            var element = this.idolElements[i];
            if (element.originalY < scrollPosition + offset) {
                element.show(0.5, 0);
            }

        }

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
