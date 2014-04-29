
var Backbone = require('backbone');
var apiEndpoint = require('../settings').soundcloud.apiEndpoint;

var Track = Backbone.Model.extend({
    urlRoot: function () {
        return apiEndpoint + 'tracks';
    }
});

var Tracks = Backbone.Collection.extend({
    model: Track,
    url: function () {
        var url = 'tracks';

        if(this.userId){
            url = 'users/'+ this.userId + '/tracks';
        }

        return apiEndpoint + url;
    }
});

var Favorites = Backbone.Collection.extend({
    url: function () {
        var userId = this.userId;
        return apiEndpoint + 'users/' + userId + '/favorites';
    }
});


module.exports = {
    Model: Track,
    Collection: Tracks,
    Favorites: Favorites
};
