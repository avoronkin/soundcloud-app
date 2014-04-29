var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
var View = require('buratino').Views.View;
var List = require('buratino').Views.List;
// var _ = require('underscore');
var helpers = require('../../helpers');

var PlaylistView = View.extend({
    template: itemTemplate,
    className: "playlist",
    data: function () {
        var data = {
            playlist: this.model.toJSON(),
            helpers: helpers
        };

        console.log('playlist data', data);
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
        var data = {};
        data.userId = this.options.user.get('id');
        data.count = this.collection.length;
        data.helpers = helpers;

        return data;
    },

    itemView: PlaylistView
});
