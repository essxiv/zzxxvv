var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');
var Image = require('../modules/image');
var GradientBackground = require('../modules/gradient_background');
var Faces = require('../modules/faces');
var InfoBlocks = require('../modules/info_blocks');
var IdolElement = require('../modules/idol_element');

module.exports = BaseView.extend({
    htmlCanvas    : null,
    gradientShapes: null,
    gradients     : null,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        if (Config.DESKTOP) {

            this.$('li').on('click', _.bind(this.onNameClick, this));
        }

        this.background = new GradientBackground({
                el       : this.$('#principals-canvas'),
                gradients: [{color: 0x6c628e}, {color: 0xf7d3db}]
            }
        );
        var ids = ['matt', 'josh', 'scott', 'brad', 'abe'];
        this.faces = new Faces({
            el : this.$('.js-mugshot'),
            ids: ids
        });

        this.infoBlocks = new InfoBlocks({
            el : this.$('.js-info-holder'),
            ids: ids
        });

        _.each(this.$('.js-scroll-element'), function (logoElement) {

            var element = new IdolElement({el: logoElement});
            this.addIdolElement(element);
        }, this);

    },

    render: function () {
        this.background.render();
        TweenMax.to(this.faces.el, 0, {autoAlpha: 0});
        AppModel.on('request-animation-frame', this.onUpdate, this);
    },

    onUpdate: function () {
        this.background.update();
    },

    onNameClick: function (e) {

        TweenMax.to(this.$('.js-copy'), 0.5, {'autoAlpha': 0});

        EventBus.trigger(EventBus.EVENTS.SHOW_CUSTOM_MOUSE);

        var $name = $(e.currentTarget);
        var data = $name.data();
        var person = data.person;
        var time = 0.5;

        this.faces.showFace(person);
        this.infoBlocks.show(person);
        this.background.show(time);

        this.$el.on('mousedown', _.bind(this.onExitClick, this));
    },

    showNames: function () {

        EventBus.trigger(EventBus.EVENTS.HIDE_CUSTOM_MOUSE);
        TweenMax.to(this.$('.js-copy'), 0.5, {'autoAlpha': 1});
    },

    onExitClick: function () {

        this.$el.off('mousedown');
        this.showNames();

        this.infoBlocks.hide();
        this.faces.hide();
        this.background.hide(0.5);
    },

    getTallestInfoBlock: function () {

        return 600;

    },

    onResize: function () {

        var totalHeight = Math.max(700, window.innerHeight);
        var contentHeight = 430;
        var ypos = window.innerHeight / 2 - contentHeight / 2;

        TweenMax.set(this.$('.js-info-holder'), {
            y    : ypos,
            width: 0.55 * window.innerWidth
        });
        TweenMax.set(this.$('.js-copy'), {y: ypos});
        TweenMax.set(this.$('.js-content'), {height: totalHeight});
        TweenMax.set(this.$el, {height: totalHeight});
        this.faces.resize(0.45 * window.innerWidth, totalHeight);
        this.background.resize(window.innerWidth, totalHeight + 5);

    },
    hide    : function () {
        this.onExitClick();
    },
    destroy : function () {
        BaseView.prototype.destroy.apply(this);

    },

});

