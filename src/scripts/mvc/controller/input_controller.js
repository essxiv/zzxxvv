var $ = require('jquery');
var _ = require('underscore');
var SeaDragon = require('../../vendor/openseadragon');

var InputModel = require('../model/input_model');
var EventBus = require('EventBus');

var controller = {

    init: function () {

        EventBus.on(EventBus.EVENTS.MAP.CLICK, this.onMapClick, this);
        EventBus.on(EventBus.EVENTS.INPUT.MOVE, this.onMapMove, this);

        this.mouseTracker = new OpenSeadragon.MouseTracker(
            {
                element     : $('body')[0],
                moveHandler : _.bind(this.onMouseTrackerMove, this),
                pressHandler: _.bind(this.onMouseTrackerPress, this)

            }
        );

    },

    onMouseTrackerMove: function (e) {
        InputModel.setMove(e.position);
    },

    onMouseTrackerPress: function (e) {
        InputModel.setClick(e.position);
    },

    onMapMove: function (e) {
        InputModel.setMove(e.position);
    },

    onMapClick: function (position) {
        InputModel.setClick(position);
    }

};

controller.init();

module.exports = controller;
