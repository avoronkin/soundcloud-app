var template = require('./template.html');
var View = require('buratino').Views.View;
var _ = require('underscore');

module.exports = View.extend({
    initialize: function () {
        this.listenTo(this.collection, 'reset sync', this.render);
    },

    template: template,

    data: function () {
        var data = {
            items: this.collection.toJSON()
        };

        console.log('data', data);
        return data;
    }
});
