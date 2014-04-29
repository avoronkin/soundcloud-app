var Activity = require('buratino').Activity;
var Users = require('../../models/user').Collection;
var UsersWidget = require('../../widgets/users/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'users/',
        name: 'users',
    },

    onStart: function (cb) {
        var users = new Users();
        users.fetch({
            // cache: true
        });

        this.layout = {
            options: {
                template: template,
                views: {
                    '#users': {
                        constructor: UsersWidget,
                        options: {
                            collection: users
                        }
                    },
                }
            }
        };

        cb();
    },
});
