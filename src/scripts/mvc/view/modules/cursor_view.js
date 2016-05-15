var AppModel = require('../../model/app_model');
var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

module.exports = BaseView.extend({

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        $(document).mousemove(_.bind(this.onMouseMove, this));
        this.cursorImage = this.$('.js-cursor');

        AppModel.on('change:custom-cursor', this.onCustomCursorChange, this);

        this.onHide();
    },

    onCustomCursorChange: function () {

        if (AppModel.get('custom-cursor')) {
            this.onShow();
        } else {
            this.onHide();
        }
    },

    onShow: function () {
        $('html').addClass('custom-cursor');
        this.cursorImage.show();
        AppModel.on('request-animation-frame', this.onUpdate, this);

    },

    onHide: function () {
        $('html').removeClass('custom-cursor');
        this.cursorImage.hide();
        AppModel.off('request-animation-frame', this.onUpdate, this);
    },

    onMouseMove: function (e) {

        this.mouseX = e.pageX - 30;
        this.mouseY = e.pageY - 30;
    },

    onUpdate: function () {

        TweenMax.set(this.cursorImage, {
            x: this.mouseX,
            y: this.mouseY
        });
    }

});

