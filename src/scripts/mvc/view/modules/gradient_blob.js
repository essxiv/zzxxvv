var BaseView = require('../base/base_view');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        var colors = options.config.colors;

        var size = 0.5;
        this.clip = new createjs.Shape();
        this.clip.graphics.beginRadialGradientFill(
            colors,
            //ratio
            //["#F00","#00F"],
            [0, 1],
            //position and radius
            0, 0, 0, 0, 0, size)
            .drawCircle(0, 0, size);
        this.minAlpha = 0.8;
        this.alpha = this.minAlpha + (Math.random() * (1 - this.minAlpha));
        this.speed = Math.random() * 0.02;

        this.vx = 1 + Math.random() * 2;
        this.vy = 1 + Math.random() * 2;

    },

    update: function () {

        this.alpha += this.speed;
        if (this.alpha > 1) {
            this.alpha = 1;
            this.speed *= -1;
        }

        if (this.alpha < this.minAlpha) {
            this.alpha = this.minAlpha;
            this.speed *= -1;
        }
    },

    getClip: function () {
        return this.clip;
    }

});

