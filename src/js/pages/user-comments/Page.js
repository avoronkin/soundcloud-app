var Activity = require('buratino').Activity;
var User = require('../../models/user').Model;
var Comments = require('../../models/comment').Collection;

var UsersWidget = require('../../widgets/users/View');
var Back2UserWidget = require('../../widgets/back2user/View');
var UserNavWidget = require('../../widgets/user-nav/View');
var CommentsWidget = require('../../widgets/comments/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'users/{userId}/comments',
        name: 'user-comments',
        nav: 'usernav',
        menuName: 'Comments',
    },

    onStart: function (cb) {
        var userId = this.params.userId;

        var user = new User();
        user.set('id', userId);
        user.fetch({
            cache: true 
        });

        var comments = new Comments();
        comments.userId = userId;
        comments.fetch({
            cache: true
        });


        this.layout = {
            options: {
                template: template,
                views: {
                    '.js-comments': {
                        constructor: CommentsWidget,
                        options: {
                            collection: comments
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
