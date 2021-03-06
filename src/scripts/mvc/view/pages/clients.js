var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var ScrollModel = require('../../model/scroll_model');
var IdolElement = require('../modules/idol_element');

module.exports = BaseView.extend({

    svgIDs  : [],
    logos   : [],
    elements: [],

    renderImageString: function () {
        var prefix = 'CDN_PATH/assets/images/clients/';
        var array = [
            '_0009_client_nike.png',
            '_0001_client_vice.png',
            '_0013_client_google_logo.png',
            '_0003_client_toyota_vert_logo.png',
            '_0007_client_red_bull_logo.png',
            '_0019_client_adidas_logo.png',
            '_0008_client_oculus_logo.png',
            '_0017_client_beats_by_dre_logo.png',
            '_0018_client_amazon_logo.png',
            '_0011_client_land_rover_solid_logo.png',
            '_0002_client_verizon_logo.png',
            '_0010_client_microsoft_logo.png',
            '_0016_client_cocacola_logo.png',
            '_0012_client_honda_logo.png',
            '_0014_client_gillette_logo.png',
            '_0006_client_starbucks_logo.png',
            '_0000_client_vitamin_water_logo.png',
            '_0005_client_target_logo.png',
            '_0004_client_time_logo.png',
            '_0015_client_GE_logo.png'
        ];
        var img = '';
        for (var i = 0; i < array.length; i++) {
            var filename = array[i];
            img += "<div class='js-client client'><div class='animationHolder'><div class='js-idol-element'> <img src='" + prefix + filename + "'></div></div></div>\n";
        }
        console.log(img);
    },

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);
        this.logos = this.$('.js-client');

        _.each(this.$('.js-idol-element'), function (logoElement) {

            var logo = new IdolElement({el: logoElement});
            this.addIdolElement(logo);
        }, this);

        this.$('img').on('mouseover', _.bind(this.onMouseOver, this));
        this.$('img').on('mouseout', _.bind(this.onMouseOut, this));

    },

    onMouseOver: function (e) {
        var img = e.currentTarget;
        var scale = 1.2;
        TweenMax.to(img, 0.5, {
            scaleX: scale,
            scaleY: scale
        });
    },

    onMouseOut: function (e) {
        var img = e.currentTarget;
        var scale = 1;
        TweenMax.to(img, 0.3, {
            scaleX: scale,
            scaleY: scale
        });
    },

    onIdolElementsUpdate: function () {

        var scrollPosition = $(window).scrollTop();
        var offset = window.innerHeight;

        var inRange = [];

        for (var i = 0; i < this.idolElements.length; i++) {

            var element = this.idolElements[i];
            if (element.originalY < scrollPosition + offset) {
                inRange.push(element);
            }

        }

        var delay = 0;
        var delayIncrement = 0.2;
        var time = 0.5;
        var prevY;

        for (i = 0; i < inRange.length; i++) {
            var inRangeElement = inRange[i];
            if (!inRangeElement.isShowing) {

                inRangeElement.show(time, delay);
                delay += delayIncrement;
                if (prevY && inRange.originalY !== prevY) {
                    delay = 0;
                }
                prevY = inRange.originalY;
            }

        }
    },

    render: function () {

    },

    onResize: function () {
        var ratio = 1;
        var logoWidth = 120;
        var leftPadding = 50;
        var columns = 5;
        var startX = 150;
        var startY = 150;
        var windowHeight = Math.max(900, window.innerHeight);
        var horPadding = -40;
        var vertPadding = 150;

        if (window.innerWidth >= 1800) {
            startX = 250;
            vertPadding = 250;
            logoWidth = 180;
        }

        if (window.innerWidth < 1024) {
            startX = 60;
            logoWidth = 90;

        }
        if (window.innerWidth <= 640) {
            logoWidth = 80;
            columns = 3;
            startX = 50;
            horPadding = -50;
        }

        if (window.innerWidth <= 374) {

            startX = 50;
            logoWidth = 70;
        }

        var rows = Math.ceil(this.logos.length / (columns));
        var screenWidth = window.innerWidth - leftPadding;

        var ypos = startY;
        var xpos = startX;

        screenWidth -= 2 * startX;

        var rowWidth = (logoWidth + horPadding) * columns;
        var rowHeight = logoWidth * ratio;
        var emptySpace = screenWidth - rowWidth;

        var colOffset = (columns - 1);
        var xIncrement = logoWidth + ( emptySpace / colOffset) + horPadding;
        var yIncrement = vertPadding;// windowHeight / rows;
        var counter = 0;

        for (var i = 0; i < this.logos.length; i++) {
            var logo = this.logos[i];
            TweenMax.set(logo, {
                y     : ypos,
                x     : xpos,
                width : logoWidth + 'px',
                height: yIncrement + 'px'
            });
            xpos += xIncrement;

            counter++;
            if (counter >= columns) {
                counter = 0;
                xpos = startX;
                ypos += yIncrement;
            }
            xpos = Math.round(xpos);
            ypos = Math.round(ypos);
        }

        var newHeight = ypos;//Math.max(windowHeight,ypos) ;//+ rowHeight / 2;

        if (!Config.DESKTOP) {
            newHeight += yIncrement;

        }
        TweenMax.set(this.$('.js-content'), {height: newHeight});

        for (i = 0; i < this.elements.length; i++) {

            var element = this.elements[i];
            element.setStartPosition();
        }

    },

    hide: function () {

        AppModel.off(null, null, this);
    },

    destroy: function () {
        this.$el.off();
        //this.$('.js-content').empty();
        this.svgIDs = [];
        this.logos = [];

        BaseView.prototype.destroy.apply(this);

    },

});

