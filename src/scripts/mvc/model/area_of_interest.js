var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Model = Backbone.Model.extend({
    x: 0,
    y: 0

});

module.exports = Model;
