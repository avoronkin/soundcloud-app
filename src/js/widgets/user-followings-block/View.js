var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
var View = require('buratino').Views.View;
var List = require('buratino').Views.List;
var helpers = require('../../helpers');

var ItemView = View.extend({
    template: itemTemplate,
    className: "following",
    data: function () {
        var data = {
            user: this.model.toJSON(),
            helpers: helpers
        };

        console.log('following data', data);
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
            count: this.options.user.get('followings_count'),
            userId: this.options.user.get('id'),
            helpers: helpers,
        };

        return data;
    },

    itemView: ItemView
});
