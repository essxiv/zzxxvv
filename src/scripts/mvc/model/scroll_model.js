var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Model = Backbone.Model.extend({

    pageMap    : null,
    sectionInfo: [],

    updateSectionMapping: function () {

        _.forEach(this.pageMap, function (map, key) {
            var $section = $(map.nodeSelector);
            if ($section.length > 0) {

                var info = this.getSectionInfoByKey(key);//this.sectionInfo[key];

                info.ypos = $section.offset().top;

            }
        }, this);

    },

    setMap: function (pageMap) {
        this.pageMap = pageMap;
    },

    getSectionInfoByKey: function (key) {

        for (var i = 0; i < this.sectionInfo.length - 1; i++) {
            var section = this.sectionInfo[i];
            if (section.id === key) {
                return section;
            }
        }

        var newEntry = {
            id: key
        };

        this.sectionInfo.push(newEntry);

        return newEntry;

    },

});

module.exports = new Model();
