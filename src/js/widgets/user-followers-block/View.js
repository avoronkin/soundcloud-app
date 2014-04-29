var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
var View = require('buratino').Views.View;
var List = require('buratino').Views.List;
var helpers = require('../../helpers');

var ItemView = View.extend({
    template: itemTemplate,
    className: "follower",
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
        this.listenTo(this.collection, 'reset sync', this.render);
    },

    data: function () {
        var data = {
            count: this.model.get('followers_count'),
            userId: this.model.get('id'),
            helpers: helpers
        };

        return data;
    },

    itemView: ItemView
});
