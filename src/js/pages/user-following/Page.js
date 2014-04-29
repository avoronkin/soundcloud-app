var Activity = require('buratino').Activity;
var Users = require('../../models/user').Followings;
var User = require('../../models/user').Model;

var UsersWidget = require('../../widgets/users/View');
var Back2UserWidget = require('../../widgets/back2user/View');
var UserNavWidget = require('../../widgets/user-nav/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'users/{userId}/following',
        name: 'user-following',
        nav: 'usernav',
        menuName: 'Following',
    },

    onStart: function (cb) {
        var userId = this.params.userId;

        var user = new User();
        user.set('id', userId);
        user.fetch({
            cache: true 
        });

        var users = new Users();
        users.userId = userId;
        users.fetch({
            cache: true
        });

        this.layout = {
            options: {
                template: template,
                views: {
                    '.js-following': {
                        constructor: UsersWidget,
                        options: {
                            collection: users
                        }
                    },
                    '.js-usernav': {
                        constructor: UserNavWidget,
                        options: {
                            userId: userId
                        }
                    },
                    '.js-back2user': {
                        constructor: Back2UserWidget,
                        options: {
                            model: user 
                        }
                    }
                }
            }
        };

        cb();
    },

});
