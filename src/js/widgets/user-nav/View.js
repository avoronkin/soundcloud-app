var template = require('./template.html');
var View = require('buratino').Views.Layout;
var helpers = require('../../helpers');
var shared = require('../../shared');
var _ = require('underscore');

module.exports = View.extend({
    toString: function () {
        return 'user nav widget';
    },
    initialize: function (options) {
        this.options = options;
        this.collection = shared.structure;
        this.listenTo(this.collection, 'add reset change', this.render);
        console.log('init user nav', options, shared.structure);
    },

    data: function () {
        var nav = [];

        var data = {
            nav: nav
        };

        // if(!this.options.userId) return data;

        var models = this.collection.filter(function (model) {
            return model.get('nav') === 'usernav';
        });

        _.each(models, function (model) {
            var url = shared.router.url(model.get('name'), {
                userId: this.options.userId || '123'
            });

            nav.push({
                url: url,
                active: model.get('here'),
                name: model.get('menuName')
            });

        }, this);


        console.log('usernav data', data);
        return data;
    },
    template: template,

});
