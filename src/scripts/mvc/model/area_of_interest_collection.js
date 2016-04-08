var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var AreaOfInterest = require('./area_of_interest');

var Collection = Backbone.Collection.extend({

    model: AreaOfInterest,



});

module.exports = new Collection(
    [
        {name: "Area 51", id:0, page:0, x:300, y:300},
        {name: "Area 31", id:1, page:0, x:2200, y:900},
        {name: "Area restricted", id:2, page:0, x:1100, y:170},
        {name: "Something special in the corner", id:3, page:0, x:400, y:600}
    ]
);
