var template = require('./template.html');
var View = require('buratino').Views.View;
var _ = require('underscore');

module.exports = View.extend({
    initialize: function () {
        this.listenTo(this.model, 'change sync', this.render);
    },

    template: template,

    data: function () {
        var data = {
            item: this.model.toJSON()
        };

        console.log('playlist data', data);
        return data;
    }
});
