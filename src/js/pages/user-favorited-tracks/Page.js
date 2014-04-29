var Activity = require('buratino').Activity;
var Tracks = require('../../models/track').Favorites;

var User = require('../../models/user').Model;

var TracksWidget = require('../../widgets/tracks/View');
var UserNavWidget = require('../../widgets/user-nav/View');
var Back2UserWidget = require('../../widgets/back2user/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'users/{userId}/likes',
        name: 'user-favorited-tracks',
        nav: 'usernav',
        menuName: 'Likes'
    },

    onStart: function (cb) {
        var userId = this.params.userId;

        var user = new User();
        user.set('id', userId);
        user.fetch({
            cache: true
        });


        var tracks = new Tracks();
        tracks.userId = userId;

        tracks.fetch({
            cache: true
        });

        this.layout = {
            options: {
                template: template,
                views: {
                    '.js-tracks': {
                        constructor: TracksWidget,
                        options: {
                            collection: tracks
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
    }

});
