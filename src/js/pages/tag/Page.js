var Activity = require('buratino').Activity;
var Tracks = require('../../models/track').Collection;
var TracksWidget = require('../../widgets/tracks/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'tags/{tag}',
        name: 'tag'
    },

    onStart: function (cb) {
        var tag = this.params.tag;

        var tracks = new Tracks();
        tracks.fetch({
            cache: true,
            data: {
                tags: tag
            }
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
                }
            }
        };

        cb();
    },
});
