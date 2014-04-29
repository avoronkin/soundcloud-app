var View = require('buratino').Views.View;
var template = require('./template.html');
var Backbone = require('backbone');
var mediator = require('buratino').mediator;

var State = Backbone.Model.extend({
    defaults: {
        playing: false
    }
});

module.exports = View.extend({
    constructor: function (attributes, options) {
        this.state = new State();
        View.apply(this, arguments);
    },
    initialize: function () {
        this.listenTo(this.state, 'change', this.render);
        this.listenTo(mediator, 'playing', this.onPlaying);
        this.listenTo(mediator, 'paused', this.onPaused);
    },
    events: {
        'click': 'trigger'
    },
    data: function () {
        var data = {};
        data.playing = this.state.get('playing');

        return data;
    },

    trigger: function (e) {
        e.stopPropagation();
        var playing = !this.state.get('playing');

        if (playing) {
            mediator.trigger('play', this.model.toJSON());
        } else {
            mediator.trigger('pause', this.model.toJSON());
        }

    },

    onPlaying: function (trackId) {
        if (trackId != this.model.get('id') && this.state.get('playing')) {
            this.state.set('playing', false);
        }
        if(trackId === this.model.get('id')){
            this.state.set('playing', true); 
        }
    },

    onPaused: function (trackId) {
        console.log('on paused', trackId)
        if(trackId === this.model.get('id')){
            this.state.set('playing', false); 
        }
    },

    template: template,
});
