var Activity = require('buratino').Activity;
var Playlists = require('../../models/playlist').Collection;
var User = require('../../models/user').Model;

var PlaylistsWidget = require('../../widgets/user-playlists/View');
var UserNavWidget = require('../../widgets/user-nav/View');
var Back2UserWidget = require('../../widgets/back2user/View');

var template = require('./layout.html');

module.exports = Activity.extend({
        defaults: {
            slug: 'users/{userId}/playlists',
            name: 'playlists',
            nav: 'usernav',
            menuName: 'Playlists',
        },

        onStart: function (cb) {
            var userId = this.params.userId;

            var user = new User();
            user.set('id', userId);
            user.fetch({
                cache: true
            });

            var playlists = new Playlists();
            playlists.userId = userId;
            playlists.fetch({
                cache: true
            });

            this.layout = {
                options: {
                    template: template,
                    views: {
                        '.js-playlists': {
                            constructor: PlaylistsWidget,
                            options: {
                                collection: playlists
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
