var BaseView = require('../base/base_view');
var GradientBlob = require('../modules/gradient_blob');
var IdolElement = require('../modules/idol_element');
var TweenMax = require('TweenMax');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    gradients     : [],
    gradientShapes: [],

    initialize: function (options) {
        this.angle = 0;
        BaseView.prototype.initialize.apply(this);
        this.htmlCanvas = this.$('#services-canvas')[0];
        this.gradients = [
            {
                colors: this.getGradients(0xda7ead),
                id    : "pink"
            },
            {
                colors: this.getGradients(0x8ad8ef),
                id    : 'blue'
            },
            {
                colors: this.getGradients(0xb39d56),
                id    : 'yellow'
            },
        ];

        this.elements = [];

        _.each(this.$('.js-scroll-element'), function (logoElement) {

            var element = new IdolElement({el: logoElement});
            this.addIdolElement(element);
        }, this);

    },

    getGradients: function (baseColor) {

        return [createjs.Graphics.getRGB(baseColor, 0.8), createjs.Graphics.getRGB(baseColor, 0)];
    },

    render: function () {
       

        AppModel.on('request-animation-frame', this.update, this);
    },

    onResize: function () {

        var textHeight = this.$('.js-content').height();
        var totalHeight = (textHeight > window.innerHeight) ? textHeight : window.innerHeight;
        var offset = ((totalHeight ) - textHeight) / 2;

        TweenMax.set(this.$('.js-content'), {y: offset});
        TweenMax.set(this.$el, {height: totalHeight + 30});

        //this.htmlCanvas.width = window.innerWidth;
        //this.htmlCanvas.height = totalHeight + 30;
        //
        //this.coloredBackground.scaleX = this.htmlCanvas.width;
        //this.coloredBackground.scaleY = this.htmlCanvas.height;
        //
        //this.yellowXpos = 0;
        //this.yellowYpos = window.innerHeight/2;
        //this.yellow.scaleY = window.innerHeight * 2;
        //this.yellow.scaleX = window.innerWidth;
        //
        //this.blueXpos = Math.max(700,window.innerWidth+100);
        //this.blue.y = 200;
        //this.blue.scaleY = window.innerHeight * 2;
        //this.blue.scaleX = 2024;
        //
        //this.pink.x = this.blue.x - 300;
        //this.pink.y = this.blue.y;
        //this.pink.scaleY = this.blue.scaleY;
        //this.pink.scaleX = this.blue.scaleX;

    },

    update: function () {

        //this.yellow.x = this.yellowXpos + Math.cos(this.angle) * 100;
        //this.yellow.y = this.yellowYpos;
        //
        //this.blue.x = this.blueXpos + Math.cos(this.angle) * -50;
        //
        //this.angle += 0.01;
        //this.stage.update();
    },

    destroy: function () {
        gradientShapes = [];
        this.$el.off();
        AppModel.off(null, null, this);
        BaseView.prototype.destroy.apply(this);
    }

});

