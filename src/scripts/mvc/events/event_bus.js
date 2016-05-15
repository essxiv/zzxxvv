var Backbone = require('backbone');
var _ = require('underscore');

var EventBus = {

    EVENTS: {
        NAVIGATE     : 'EVENTS_NAVIGATE',
        START_REQUEST: 'EVENTS_START_REQUEST',

        SHOW_CUSTOM_MOUSE: 'SHOW_CUSTOM_MOUSE',
        HIDE_CUSTOM_MOUSE: 'HIDE_CUSTOM_MOUSE'

    }
};

_.extend(EventBus, Backbone.Events);

module.exports = EventBus;
