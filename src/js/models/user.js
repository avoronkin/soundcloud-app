var Backbone = require('backbone');
var apiEndpoint = require('../settings').soundcloud.apiEndpoint;

var User = Backbone.Model.extend({
    urlRoot: function () {
        return apiEndpoint + 'users';
    }
});

var Users = Backbone.Collection.extend({
    model: User,
    url: function () {
        return apiEndpoint + 'users';
    }
});

var Followings = Users.extend({
    url: function () {
        var userId = this.userId;
        return apiEndpoint + 'users/' + userId + '/followings';
    }
});

var Followers = Users.extend({
    url: function () {
        var userId = this.userId;
        return apiEndpoint + 'users/' + userId + '/followers';
    }
});


module.exports = {
    Model: User,
    Collection: Users,
    Followings: Followings,
    Followers: Followers,
};
