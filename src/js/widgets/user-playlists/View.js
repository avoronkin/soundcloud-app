var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
var View = require('buratino').Views.View;
var List = require('buratino').Views.List;
var _ = require('underscore');
var helpers = require('../../helpers');

var PlaylistView = View.extend({
    template: itemTemplate,
    data: function () {
        var data = {
            playlist: this.model.toJSON()
        };
        data.url = helpers.url;
        data.img = helpers.img;

        console.log('playlist data', data);
        return data;
    },

    events: {
        'click': 'onClick'
    },

    onClick: function () {
        console.log('playlist click')
    }
});

module.exports = List.extend({
    template: listTemplate,
    containerSelector: '.js-playlists-container',
    initialize: function (options) {
        this.options = options;
        this.listenTo(this.collection, 'reset sync', this.render);
    },
    data: function () {
        var data = {};

        return data;
    },
    itemView: PlaylistView
});
