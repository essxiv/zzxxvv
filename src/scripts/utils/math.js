var Backbone = require('backbone');
var _ = require('underscore');

var math = {

    distance:function(pointA,pointB){

        var dx=pointA.x-pointB.x;
        var dy=pointA.y-pointB.y;
        var dist =Math.sqrt(dx*dx+dy*dy);
        return dist;

    },

    between: function (min, p, max) {
        var result = false;

        if (min < max) {
            if (p > min && p < max) {
                result = true;
            }
        }

        if (min > max) {
            if (p > max && p < min) {
                result = true;
            }
        }

        if (p == min || p == max) {
            result = true;
        }

        return result;
    },

    pointInRect: function (point, rect) {
        var x = point.x;
        var y = point.y;
        var left = rect.x;
        var top = rect.y;
        var right = left + rect.width;
        var bottom = top + rect.height;
        var result = false;

        if (this.between(left, x, right) && this.between(top, y, bottom)) {
            result = true;
        }
        return result;

    }
};

module.exports = math;