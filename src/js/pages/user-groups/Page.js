var Activity = require('buratino').Activity;
var Groups = require('../../models/group').Collection;
var User = require('../../models/user').Model;

var GroupsWidget = require('../../widgets/groups/View');
var UserNavWidget = require('../../widgets/user-nav/View');
var Back2UserWidget = require('../../widgets/back2user/View');

var template = require('./layout.html');

module.exports = Activity.extend({
    defaults: {
        slug: 'users/{userId}/groups',
        name: 'user-groups',
        nav: 'usernav',
        menuName: 'Groups'
    },

    onStart: function (cb) {
        var userId = this.params.userId;

        var user = new User();
        user.set('id', userId);
        user.fetch({
            cache: true 
        });


        var groups = new Groups();
        groups.userId = userId;
        groups.fetch({
            cache: true
        });

       this.layout = {
            options: {
                template: template,
                views: {
                    '.js-groups': {
                        constructor: GroupsWidget,
                        options: {
                            collection: groups
                        }
                    },
                    '.js-usernav': {
                        constructor: UserNavWidget,
                        options: {
                            userId: userId
                        }
                    },
                    '.js-back2user': {
                        constructor: Back2UserWidget,
                        options: {
                            model: user 
                        }
                    }


                }
            }
        };

        cb();
    },

});
