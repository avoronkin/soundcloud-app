var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
// var View = require('buratino').Views.View;
var View = require('buratino').Views.Layout;
var List = require('buratino').Views.List;
var PlayButton = require('../play-button/View');

var helpers = require('../../helpers');
var mediator = require('buratino').mediator;

var ItemView = View.extend({
    template: itemTemplate,
    className: "favorited",
    initialize: function () {

        this.views = {
            '.js-play-button': {
                constructor: PlayButton,
                options: {
                    model: this.model
                }
            }
        };
    },

    data: function () {
        var data = {
            item: this.model.toJSON(),
            helpers: helpers
        };

        return data;
    },
});

module.exports = List.extend({
    template: listTemplate,
    containerSelector: '.js-container',
    initialize: function (options) {
        // this.options = options;
        this.listenTo(this.collection, 'reset sync', this.render);
    },

    data: function () {
        var data = {
            count: this.model.get('public_favorites_count'),
            userId: this.model.get('id'),
            helpers: helpers
        };
        return data;
    },

    itemView: ItemView
});
