var $ = require('jquery');
var _ = require('underscore');

var AppModel = require('../model/app_model');
var MapModel = require('../model/map_model');
var EventBus = require('EventBus');

var controller = {

    init: function () {
        EventBus.on(EventBus.EVENTS.MAP.MOVE, this.onMapMove, this);
        EventBus.on(EventBus.EVENTS.MAP.SIGNATURE.CLICK, this.onSignatureClick, this);
        EventBus.on(EventBus.EVENTS.MAP.ARCHIVIST.AREA_CLICKED, this.onArchivistAreaClicked);

    },

    onMapMove : function (moveData) {
        //MapModel.set({
        //    zoomLevel           : moveData.zoomLevel,
        //    scrollPercentage    : moveData.scrollPercentage,
        //    maxBottomOverlap    : moveData.maxBottomOverlap,
        //    currentBottomOverlap: moveData.currentBottomOverlap,
        //    bottomPoint         : moveData.rightBottomPoint
        //});

    },

    onArchivistAreaClicked: function (areaOfInterestID) {

        //var areaOfInterestModel = AreaOfInterestCollection.get( areaOfInterestID);
        MapModel.set('areaOfInterest', areaOfInterestID);
    },

    onSignatureClick: function (signatureModel) {

        MapModel.set('selectedSignature', signatureModel);
    }

};

controller.init();

module.exports = controller;
