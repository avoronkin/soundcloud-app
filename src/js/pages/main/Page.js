var Activity = require('buratino').Activity;
var Tracks = require('../../models/track').Collection;
var TracksWidget = require('../../widgets/tracks/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: '',
        name: 'home',
        main: true,
    },
    onStart: function (cb) {

        var tracks= new Tracks();
        tracks.fetch({
            // cache: true
        });

        this.layout = {
            options: {
                template: template,
                views: {
                    '#tracks': {
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
