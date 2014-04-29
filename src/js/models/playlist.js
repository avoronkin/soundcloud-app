
var Backbone = require('backbone');
var apiEndpoint = require('../settings').soundcloud.apiEndpoint;

var Playlist = Backbone.Model.extend({
    urlRoot: function () {
        return apiEndpoint + 'playlists';
    }
});

var Playlists = Backbone.Collection.extend({
    model: Playlist,
    url: function () {
        var url = 'playlists';

        if(this.userId){
            url = 'users/'+ this.userId + '/playlists';
        }

        return apiEndpoint + url;
    }
});

module.exports = {
    Model: Playlist,
    Collection: Playlists
};
