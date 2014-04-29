var template = require('./template.html');
var View = require('buratino').Views.View;
var helpers = require('../../helpers');

module.exports = View.extend({
    initialize: function () {
        this.listenTo(this.model, 'change sync', this.render);
    },

    template: template,

    data: function () {
        var data = {
            user: this.model.toJSON(),
            helpers: helpers
        };

        return data;
    }
});
