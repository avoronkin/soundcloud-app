var listTemplate = require('./list-template.html');
var itemTemplate = require('./item-template.html');
var View = require('buratino').Views.View;
var List = require('buratino').Views.List;
var _ = require('underscore');
var helpers = require('../../helpers');

var UserView = View.extend({
    template: itemTemplate,
    data: function () {
        var data = {
            user: this.model.toJSON()
        };
        data.url = helpers.url;
        data.img = helpers.img;

        console.log('user data', data);
        return data;
    }
});

module.exports = List.extend({
    template: listTemplate,
    containerSelector: '.js-users-container',
    initialize: function () {
        this.listenTo(this.collection, 'reset sync', this.render);
    },
    itemView: UserView
});
