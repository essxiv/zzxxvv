var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var Signature = require('./signature');
var MathUtil = require('MathUtil');

var Collection = Backbone.Collection.extend({

    model: Signature,

    getSignaturesPerPage:function(page){

        return this.where({page: page});
    },

    getSignaturesWithinRadius:function(point,radius,page){
        var signaturesOnPage=this.where({page: page});
        var signaturesWithinRadius=[];
        _.each(signaturesOnPage,function(signatureModel){

            var rect=signatureModel.get('rect');
            var x=rect.x;
            var y=rect.y;
            var w=rect.width;
            var h=rect.height;

            //option 1. A click is within the signature rectangle
            if (MathUtil.pointInRect(point, rect)) {
                signaturesWithinRadius.push(signatureModel);
            }
            //option 2. A click is within the radius of the topLeft of the rect
            if (MathUtil.distance(point, {x:x,y:y})<=radius) {
                signaturesWithinRadius.push(signatureModel);
            }

            //option 3. A click is within the radius of the center of the rect
            if (MathUtil.distance(point, {x:x+w/2,y:y+h/2})<=radius) {
                signaturesWithinRadius.push(signatureModel);
            }


        },this);

        return _.unique(signaturesWithinRadius);
    }

});

module.exports = new Collection(
    [
        {name: "person A",   id:"0",   page: 0,rect:{x:1322,y:165,width:932,height:100}},

        {name: "person B",   id:"1",   page: 0,rect:{x:843,y:407,width:100,height:100}},

        {name: "person C",    id:"2",  page: 0,rect:{x:1170,y:553,width:636,height:135}},

        {name: "person D",    id:"3",  page: 0,rect:{x:1066,y:669,width:644,height:100}},

        {name: "person E",  id:"4",   page: 0,rect:{x:791,y:814,width:443,height:100}},

    ]
);
