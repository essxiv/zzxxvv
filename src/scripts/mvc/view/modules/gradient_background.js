var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var GradientBlob = require('./gradient_blob');

module.exports = BaseView.extend({
    htmlCanvas    : null,
    gradientShapes: null,
    gradients     : null,
    type          : 'STATIC',

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        this.htmlCanvas = this.$el[0];
        this.gradients = [];
        this.gradientShapes = [];

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
            this.stage.addChild(gradientShape.getClip());
        }

    },

    update: function () {

        var bottomLeft = this.gradientShapes[0];
        var clip = bottomLeft.getClip();
        this.stage.update();
    },

    resize: function (width, height) {

        this.htmlCanvas.width = width;
        this.htmlCanvas.height = height;
        this.coloredBackground.scaleX = this.htmlCanvas.width;
        this.coloredBackground.scaleY = this.htmlCanvas.height;



        if (this.gradientShapes && this.gradientShapes.length > 0) {
            for (var i = 0; i < this.gradientShapes.length; i++) {
                var gradient = this.gradientShapes[i].getClip();

                gradient.scaleY = gradient.scaleX =width;
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

        }
        this.stage.update();

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

