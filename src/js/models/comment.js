var Backbone = require('backbone');
var apiEndpoint = require('../settings').soundcloud.apiEndpoint;

var Comment = Backbone.Model.extend({
    // url: function(){
    //     return apiEndpoint + 'comments'; 
    // }
});

var Comments = Backbone.Collection.extend({
    model: Comment,
    url: function(){
        var url = 'comments';

        if(this.trackId){
            url = 'track/' + this.trackId + '/comments';
        }

        if(this.userId){
            url = 'users/' + this.userId + '/comments';
        }


        return apiEndpoint + url;
    }
});

module.exports = {
    Model: Comment,
    Collection: Comments
};
