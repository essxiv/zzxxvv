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

module.exports = BaseView.extend({
    htmlCanvas    : null,
    gradientShapes: null,
    gradients     : null,

    initialize: function (options) {
        BaseView.prototype.initialize.apply(this);

        if (Config.DESKTOP) {

            this.$('li').on('click', _.bind(this.onNameClick, this));
        }
        this.$('.info span').addClass('hidden');

        this.background = new GradientBackground({
                el       : this.$('#principals-canvas'),
                gradients: [{color: 0x6c628e}, {color: 0xf7d3db}]
            }
        );
        var ids = ['matt', 'josh', 'scott', 'brad', 'abe'];
        this.faces = new Faces({
            el : this.$('.js-mugshot'),
            ids: ids
        })

        this.infoBlocks = new InfoBlocks({
            el : this.$('.js-info-holder'),
            ids: ids
        });

    },

    render: function () {
        this.background.render();
        TweenMax.to(this.faces.el, 0, {alpha: 0});
        AppModel.on('request-animation-frame', this.onUpdate, this);
    },

    onUpdate: function () {
        this.background.update();
    },

    onNameClick: function (e) {

        TweenMax.to(this.$('.js-names'), 0.5, {'alpha': 0});

        var $name = $(e.currentTarget);
        var data = $name.data();
        var person = data.person;
        var time = 0.5;

        this.faces.showFace(person);
        this.infoBlocks.showTitle();
        this.showInfo(person);

        TweenMax.to(this.faces.el, time, {
            alpha: 1
        });

        this.background.show( time);

        this.$el.on('mousedown', _.bind(this.onExitClick, this));
    },

    showInfo: function (person) {

        this.infoBlocks.show(person);
    },

    showNames: function () {

        TweenMax.to(this.$('.js-names'), 0.5, {'alpha': 1});
        this.infoBlocks.hide();
    },

    onExitClick: function () {

        this.infoBlocks.hideTitle();
        this.$el.off('mousedown');
        this.showNames();
        var time = 0.5;

        TweenMax.to(this.faces.el, time, {
            alpha: 0
        });

        this.background.hide(time);
    },

    getTallestInfoBlock: function () {
        //save current state
        var js_info_holder = {
            isHidden: this.$('.js-info-holder').hasClass('hidden')
        };

        //grab the info items we are not  showing
        var hiddenInfoItems = this.$('.js-info.hidden');

        // get the info and list height, compare and pick tallest
        this.$('.js-info-holder').removeClass('hidden');
        this.$('.js-info').removeClass('hidden');

        var tallest = 0;
        _.each(this.$('.js-info'), function (el) {
            var $el = $(el);
            var height = $el.height();
            if (height > tallest) {
                tallest = height;
            }
        }, this);

        //set back to current state

        hiddenInfoItems.addClass('hidden');
        var w = window.innerWidth;
        if (js_info_holder.isHidden) {
            w = 0;
            this.$('.js-info-holder').addClass('hidden');
        }

        var headerHeight = this.$('.js-title').height();
        return tallest + headerHeight;

    },

    onResize: function () {
        var reset = false;
        if (this.$('.js-names').hasClass('hidden')) {
            reset = true;
            this.$('.js-names').removeClass('hidden');
        }

        var padding = 0;
        var textHeight = this.getTallestInfoBlock();
        var totalHeight = this.$el.height() + 40;

        var offset = totalHeight / 2 - textHeight / 2;
        var ypos = offset + padding;
        if (ypos <= 0) {
            ypos = 0;
        }

        TweenMax.set(this.$('.js-info-holder'), {
            y    : ypos,
            width: 0.55 * window.innerWidth
        });
        TweenMax.set(this.$('.js-copy'), {y: ypos});
        TweenMax.set(this.$('.js-content'), {height: totalHeight});
        TweenMax.set(this.$el, {height: totalHeight});

        this.background.resize(window.innerWidth, totalHeight);

        if (reset) {
            this.$('.js-names').addClass('hidden');

        }

    },

    destroy: function () {
        BaseView.prototype.destroy.apply(this);

    },

});

