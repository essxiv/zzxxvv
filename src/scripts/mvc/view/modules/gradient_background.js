var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var GradientBlob = require('./gradient_blob');

module.exports = BaseView.extend({
    htmlCanvas: null,
    gradientShapes: null,
    gradients: null,
    width: null,
    height: null,
    type: 'STATIC',

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        this.htmlCanvas = this.$el[0];
        this.gradients = [];
        this.gradientShapes = [];
        this.width = 0;
        this.height = 0;

        for (var i = 0; i < options.gradients.length; i++) {
            var obj = options.gradients[i];
            this.gradients.push(
                {colors: this.getGradients(obj.color)}
            )
        }

    },

    getGradients: function (baseColor) {

        return [createjs.Graphics.getRGB(baseColor, 0.8), createjs.Graphics.getRGB(baseColor, 0)];
    },

    render: function () {
        this.stage = new createjs.Stage(this.$el.attr('id'));

        this.coloredBackground = new createjs.Shape();
        this.coloredBackground.graphics.beginFill('#d85076');
        this.coloredBackground.graphics.drawRect(0, 0, 1, 1);
        this.coloredBackground.graphics.endFill();

        this.stage.addChild(this.coloredBackground);

        for (var i = 0; i < this.gradients.length; i++) {
            var gradient = this.gradients[i];
            var gradientShape = new GradientBlob({config: gradient});

            this.gradientShapes.push(gradientShape);
            var clip = gradientShape.getClip();
            clip.alpha = 0;
            this.stage.addChild(clip);
        }

    },

    update: function () {

        var bottomLeft = this.gradientShapes[0];
        var clip = bottomLeft.getClip();
        this.coloredBackground.scaleX = this.width;

        this.stage.update();
    },

    show: function (width, time) {

        TweenMax.to(this, time, {width: width});
        for (var i = 0; i < this.gradientShapes.length; i++) {
            var gradient = this.gradientShapes[i].getClip();
            TweenMax.to(gradient, time, {
                delay: time * 0.5,
                alpha: 1
            });
        }

    },

    hide: function (time, width) {
        TweenMax.to(this, time, {
            delay: 0,
            width: 0
        });
        for (var i = 0; i < this.gradientShapes.length; i++) {
            var gradient = this.gradientShapes[i].getClip();
            TweenMax.to(gradient, 0.5, {alpha: 0});
        }
    },

    resize: function (width, height) {

        this.htmlCanvas.width = width;
        this.htmlCanvas.height = height;
        //this.coloredBackground.scaleX = this.htmlCanvas.width;
        this.coloredBackground.scaleY = this.htmlCanvas.height;

        for (var i = 0; i < this.gradientShapes.length; i++) {
            var gradient = this.gradientShapes[i].getClip();

            gradient.scaleY = gradient.scaleX = width;
            if (height > width) {
                //portrait
                gradient.scaleY = gradient.scaleX = height;

            }
        }

        if (this.type === 'STATIC') {

            var bottomLeft = this.gradientShapes[0];
            var clip = bottomLeft.getClip();
            clip.y = height;

            var topRight = this.gradientShapes[1];
            clip = topRight.getClip();
            clip.x = width;

        }

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

