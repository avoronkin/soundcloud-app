var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
var View = require('buratino').Views.View;
var List = require('buratino').Views.List;
var _ = require('underscore');
var helpers = require('../../helpers');

var TrackView = View.extend({
    template: itemTemplate,
    data: function () {
        var data = {
            track: this.model
        };
        data.url = helpers.url;
        data.img = helpers.img;

        console.log('track data', data);
        return data;
    }
});

module.exports = List.extend({
    template: listTemplate,
    containerSelector: '.js-tracks-container',
    initialize: function (options) {
        this.options = options;
        this.listenTo(this.model, 'change sync', this.render);
    },
    getItems: function () {
        return this.model.get('tracks');
    },
    itemView: TrackView
});
