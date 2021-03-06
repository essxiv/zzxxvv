var BaseView = require('../base/base_view');
var TweenMax = require('TweenMax');
var Config = require('Config');
var $ = require('jquery');
var _ = require('underscore');

var EventBus = require('EventBus');
var AppModel = require('../../model/app_model');

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
            this.initDesktop();
        } else {
            this.initMobile();
        }

        _.each(this.$('.js-scroll-element'), function (logoElement) {

            var element = new IdolElement({el: logoElement});
            this.addIdolElement(element);
        }, this);

    },

    initMobile: function () {

        this.$('.js-desktop').remove();
    },

    initDesktop: function () {

        this.background=this.$('.js-bg');
        this.$('.js-mobile').remove();
        this.$('li').on('click', _.bind(this.onNameClick, this));
     
        var ids = ['matt', 'josh', 'scott', 'brad', 'abe'];
        this.faces = new Faces({
            el : this.$('.js-mugshot'),
            ids: ids
        });

        this.infoBlocks = new InfoBlocks({
            el : this.$('.js-info-holder'),
            ids: ids
        });
    },

    render: function () {
        if (Config.DESKTOP) {
            //this.background.render();
            TweenMax.to(this.faces.el, 0, {autoAlpha: 0});
        }
        AppModel.on('request-animation-frame', this.onUpdate, this);
    },

    onUpdate: function () {
        if (Config.DESKTOP) {
            //this.background.update();

        }
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

        this.background.removeClass('hidden');


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
        this.background.addClass('hidden');

    },

    getTallestInfoBlock: function () {

        return 600;

    },

    onResize: function () {
        if (Config.DESKTOP) {
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
            //this.background.resize(window.innerWidth, totalHeight + 5);
        }

    },
    hide    : function () {
        if (Config.DESKTOP) {
            this.onExitClick();
        }
    },
    destroy : function () {
        BaseView.prototype.destroy.apply(this);

    },

});

