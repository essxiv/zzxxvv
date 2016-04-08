var Backbone = require('backbone');
var _ = require('underscore');

var EventBus = {

    EVENTS: {
        NAVIGATE     : 'EVENTS_NAVIGATE',
        START_REQUEST: 'EVENTS_START_REQUEST',

        INPUT: {
            CLICK: "INPUT_CLICK",
            MOVE : "INPUT_MOVE"
        },

        CLICK: 'EVENTS_DEFAULT_CLICK',

        SUGGESTIONS: {
            SIGNATURE: {
                SELECTED: "EVENTS_SUGGESTIONS_SELECTED"
            }
        },

        MAP: {
            CLICK    : 'EVENTS_MAP_CLICK',
            MOVE     : 'EVENTS_MAP_MOVE',
            ARCHIVIST: {
                AREA_CLICKED: 'EVENTS_MAP_ARCHIVIST_AREA_CLICKED'
            },
            SIGNATURE: {
                CLICK: 'EVENTS_MAP_SIGNATURE_CLICK'
            }
        }
    }
};

_.extend(EventBus, Backbone.Events);

module.exports = EventBus;
