var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Model = Backbone.Model.extend({

    setMove: function (position) {

        this.trigger('move', position);
    },

    setClick: function (position) {
        this.set('click', position);
        this.trigger('click', position);
    }

});

module.exports = new Model();
