var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
var View = require('buratino').Views.View;
var List = require('buratino').Views.List;
var helpers = require('../../helpers');

var ItemView = View.extend({
    template: itemTemplate,
    className: "favorited",
    data: function () {
        var data = {
            group: this.model.toJSON(),
            helpers: helpers
        };

        console.log('group data', data);
        return data;
    },
});

module.exports = List.extend({
    template: listTemplate,
    containerSelector: '.js-container',
    initialize: function (options) {
        this.options = options;
        this.listenTo(this.collection, 'reset sync', this.render);
    },

    data: function () {
        var data = {
            count: this.collection.length,
            helpers: helpers,
            userId: this.options.user.get('id')
        };

        console.log('groups data', data);
        return data;
    },

    itemView: ItemView
});
