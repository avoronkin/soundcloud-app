var Activity = require('buratino').Activity;
var Track = require('../../models/track').Model;
var TrackWidget = require('../../widgets/track/View');

var TrackComments = require('../../models/comment').Collection;
var TrackCommentsWidget = require('../../widgets/track-comments/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'tracks/{id}',
        name: 'track',
    },
    onStart: function (cb) {
        var trackId = this.params.id;

        var track = new Track({});
        track.set('id', trackId);
        track.fetch({
            cache: true
        });

        var trackComments = new TrackComments();
        trackComments.trackId = trackId;
        trackComments.fetch();

        this.layout = {
            options: {
                template: template,
                views: {
                    '#track': {
                        constructor: TrackWidget,
                        options: {
                            model: track
                        }
                    },
                    '#comments': {
                        constructor: TrackCommentsWidget,
                        options: {
                            collection: trackComments
                        }
                    },

                }
            }
        }

        cb();
    }
});
