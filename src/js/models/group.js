var Backbone = require('backbone');
var apiEndpoint = require('../settings').soundcloud.apiEndpoint;

var Group = Backbone.Model.extend({});

var Groups = Backbone.Collection.extend({
    model: Group,
    url: function () {
        var url = 'groups';

        if(this.userId){
            url = 'users/'+ this.userId + '/groups';
        }

        return apiEndpoint + url;
    }
});

module.exports = {
    Model: Group,
    Collection: Groups
};
