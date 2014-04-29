var template = require('./template.html');
var View = require('buratino').Views.View;
require('jplayer');
var $ = require('jquery');
var mediator = require('buratino').mediator;
var settings = require('../../settings');
var Backbone = require('backbone');

var State = Backbone.Model.extend({

});

module.exports = View.extend({
    template: template,
    initialize: function () {
        this.state = new State();

    },

    afterRender: function () {
        var self = this;

        this.ui = {};
        this.ui.$player = this.$el.find('#jquery_jplayer_1');

        var stream = {
            mp3: "https://api.soundcloud.com/tracks/116923753/stream?client_id=82376cfecd44a1f7674f040a08b0e0e7"
        },
            ready = false;

        this.ui.$player.jPlayer({
            ready: function (event) {
                ready = true;
                $(this).jPlayer("setMedia", stream);
            },
            pause: function () {
                var track = self.state.get('track');
                mediator.trigger('paused', track.id);
            },
            play: function () {
                var track = self.state.get('track');
                if(track){
                    mediator.trigger('playing', track.id);
                }
            },

            error: function (event) {
                if (ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                    // Setup the media stream again and play it.
                    $(this).jPlayer("setMedia", stream).jPlayer("play");
                }
            },
            swfPath: "js",
            supplied: "mp3",
            preload: "none",
            wmode: "window",
            keyEnabled: true
        });


        mediator.on('play', function (track) {
            this.state.set('track', track);
            var streamUrl = 'https://api.soundcloud.com/tracks/' + track.id + '/stream?client_id=' + settings.soundcloud.clientId;
            this.ui.$player.jPlayer("setMedia", {mp3:streamUrl}).jPlayer("play");
            mediator.trigger('playing', track.id);
        }, this);

        mediator.on('pause', function(track){
            this.ui.$player.jPlayer("pause");
        }, this);

    }
});
