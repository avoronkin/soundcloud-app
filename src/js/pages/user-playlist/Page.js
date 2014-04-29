var Activity = require('buratino').Activity;

var Playlist = require('../../models/playlist').Model;

var PlaylistWidget = require('../../widgets/playlist/View');
var PlaylistTracksWidget = require('../../widgets/playlist-tracks/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'users/{userId}/playlists/{playlistId}',
        name: 'playlist',
    },

    onStart: function (cb) {
        var playlistId = this.params.playlistId;
        var userId = this.params.userId;

        var playlist = new Playlist();
        playlist.set('id', playlistId);
        playlist.fetch({
            cache: true
        });

        this.layout = {
            options: {
                template: template,
                views: {
                    '.js-playlist': {
                        constructor: PlaylistWidget,
                        options: {
                            model: playlist
                        }
                    },
                    '.js-playlist-tracks': {
                        constructor: PlaylistTracksWidget,
                        options: {
                            model: playlist
                        }
                    },

                }
            }
        };

        cb();
    }

});
