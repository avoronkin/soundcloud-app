var Activity = require('buratino').Activity;

var User = require('../../models/user').Model;
var UserWidget = require('../../widgets/user-info-block/View');

var Followers = require('../../models/user').Followers;
var FollowersWidget = require('../../widgets/user-followers-block/View');

var Followings = require('../../models/user').Followings;
var FollowingsWidget = require('../../widgets/user-followings-block/View');

var Favorites = require('../../models/track').Favorites;
var UserFavoritesWidget = require('../../widgets/user-favorites-block/View');

var Comments = require('../../models/comment').Collection;
var CommentsWidget = require('../../widgets/user-comments-block/View');

var Groups = require('../../models/group').Collection;
var GroupsWidget = require('../../widgets/user-groups-block/View');


var Playlists = require('../../models/playlist').Collection;
var PlaylistsWidget = require('../../widgets/user-playlists-block/View');

var Tracks = require('../../models/track').Collection;
var UserTracksWidget = require('../../widgets/tracks/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'users/{id}',
        name: 'user',
    },

    onStart: function (cb) {
        var userId = this.params.id;

        var user = new User();
        user.clear();
        user.set('id', userId);
        user.fetch({
            cache: true
        });

        var tracks = new Tracks();
        tracks.reset();
        tracks.userId = userId;
        tracks.fetch({
            cache: true
        });

        var followings = new Followings();
        followings.reset();
        followings.userId = userId;
        followings.fetch({
            cache: true,
            data: {
                limit: 3
            }
        });

        var followers = new Followers();
        followers.reset();
        followers.userId = userId;
        followers.fetch({
            cache: true,
            data: {
                limit: 3
            }
        });


        var favorites = new Favorites();
        favorites.reset();
        favorites.userId = userId;
        favorites.fetch({
            cache: true,
            data: {
                limit: 3
            }
        });

        var comments = new Comments();
        comments.reset();
        comments.userId = userId;
        comments.fetch({
            cache: true,
            data: {
                limit: 3
            }
        });

        var groups = new Groups();
        groups.reset();
        groups.userId = userId;
        groups.fetch({
            cache: true,
            data: {
                limit: 3
            }
        });


        var playlists = new Playlists();
        playlists.reset();
        playlists.userId = userId;
        playlists.fetch({
            cache: true,
            data: {
                limit: 3
            }
        });


        this.layout = {
            options: {
                template: template,
                views: {
                    '#user': {
                        constructor: UserWidget,
                        options: {
                            model: user
                        }
                    },

                    '#followings': {
                        constructor: FollowingsWidget,
                        options: {
                            collection: followings,
                            user: user
                        }
                    },

                    '#followers': {
                        constructor: FollowersWidget,
                        options: {
                            collection: followers,
                            model: user
                        }
                    },

                    '#tracks': {
                        constructor: UserTracksWidget,
                        options: {
                            collection: tracks,
                        }
                    },

                    '#groups': {
                        constructor: GroupsWidget,
                        options: {
                            collection: groups,
                            user: user
                        }
                    },


                    '#favorites': {
                        constructor: UserFavoritesWidget,
                        options: {
                            collection: favorites,
                            model: user
                        }
                    },

                    '#playlists': {
                        constructor: PlaylistsWidget,
                        options: {
                            collection: playlists,
                            user: user
                        }
                    },

                    '#comments': {
                        constructor: CommentsWidget,
                        options: {
                            collection: comments,
                            model: user
                        }
                    }

                }
            }
        };

        cb();
    }

});
