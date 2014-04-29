var template = require('./template.html');
var View = require('buratino').Views.Layout;
var Player = require('../top-player/View');

module.exports = View.extend({
    toString: function () {
        return 'top nav widget';
    },

    initialize: function (options) {

        this.views = {
            '.js-player': {
                constructor: Player,
                options: {}
            }
        };

    },

    template: template,

});
