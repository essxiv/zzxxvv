var BaseView = require('../base/base_view');
var GradientBlob = require('../modules/gradient_blob');
var TweenMax = require('TweenMax');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

module.exports = BaseView.extend({

    gradients     : [
        {colors: ["#f7d3db", createjs.Graphics.getRGB(0xf7d3db, 0)]},
        {colors: ["#765f8b", createjs.Graphics.getRGB(0x765f8b, 0)]},
        {colors: ["#fff02e", createjs.Graphics.getRGB(0xfff02e, 0)]},
        {colors: ["#1fbdd5", createjs.Graphics.getRGB(0x1fbdd5, 0)]},
        {colors: ["#f7d3db", createjs.Graphics.getRGB(0xf7d3db, 0)]},
    ],
    gradientShapes: [],

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        this.htmlCanvas = this.$('#services-canvas')[0];

    },

    render: function () {
        this.$el.on('click', _.bind(this.onClick, this));
        this.stage = new createjs.Stage("services-canvas");

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

        AppModel.on('request-animation-frame', this.update, this);
    },

    onClick: function () {
        EventBus.trigger(EventBus.EVENTS.NAVIGATE, AppModel.PAGES.PRINCIPALS);
    },

    onResize: function () {

        this.htmlCanvas.width = window.innerWidth;
        this.htmlCanvas.height = window.innerHeight;

        this.coloredBackground.scaleX = this.htmlCanvas.width;
        this.coloredBackground.scaleY = this.htmlCanvas.height;

        for (var i = 0; i < this.gradientShapes.length; i++) {
            var gradient = this.gradientShapes[i].getClip();
            gradient.x = Math.random() * window.innerWidth;
            gradient.y = Math.random() * window.innerHeight;
            gradient.scaleX = window.innerWidth;
            gradient.scaleY = window.innerWidth;
        }

    },

    update: function () {

        var maxWidth = window.innerWidth;
        var maxHeight = window.innerHeight;
        for (var i = 0; i < this.gradientShapes.length; i++) {
            var gradient = this.gradientShapes[i];
            var clip = gradient.getClip();
            clip.x += gradient.vx;
            if (clip.x > maxWidth) {
                clip.x = maxWidth
                gradient.vx *= -1
            } else if (clip.x < 0) {
                clip.x = 0;
                gradient.vx *= -1
            }

            clip.y += gradient.vy;
            if (clip.y > maxHeight) {
                clip.y = maxHeight
                gradient.vy *= -1
            } else if (clip.y < 0) {
                clip.y = 0;
                gradient.vy *= -1
            }

        }
        this.stage.update();
    },

    destroy: function () {
        gradientShapes = [];
        this.$el.off();
        AppModel.off(null, null, this);
        BaseView.prototype.destroy.apply(this);
    }

});

