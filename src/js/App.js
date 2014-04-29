var Structure = require('buratino').Structure;
var App = require('buratino').App;
var mediator = require('buratino').mediator;
var shared = require('./shared');
var Layout = require('buratino').Views.Layout;

var Router = require('buratino').Router;
var $ = require('jquery');
var _ = require('underscore');

var router = shared.router = new Router();
var structure = new Structure();
shared.structure = structure;

var TopNav = require('./widgets/top-nav/View');
var topNav = new TopNav({});

//страницы 
var mainPage = require('./pages/main/Page');
var trackPage = require('./pages/track/Page');
var tagPage = require('./pages/tag/Page');

var userPage = require('./pages/user/Page');
var userFavoritedTracksPage = require('./pages/user-favorited-tracks/Page');
var userGroupsPage = require('./pages/user-groups/Page');
var userCommentsPage = require('./pages/user-comments/Page');
var userPlaylistsPage = require('./pages/user-playlists/Page');
var userPlaylistPage = require('./pages/user-playlist/Page');
var usersPage = require('./pages/users/Page');
var userFollowersPage = require('./pages/user-followers/Page');
var userFollowingPage = require('./pages/user-following/Page');

//приложение
var mainApp = new App({
    name: 'mainApp',
    slug: '',
    structure: structure,
    activities: [mainPage,
        trackPage,
        tagPage,
        userFavoritedTracksPage,
        usersPage, userPage,
        userFollowersPage,
        userFollowingPage,
        userPlaylistsPage, userPlaylistPage,
        userCommentsPage,
        userGroupsPage
    ]
});



$(document).ready(function () {

    topNav.setElement('#top-nav');
    topNav.render();

    var layout;
    var $el = $('#main');

    //layout manager
    mediator.on('activity:start', function (page) {

        if (layout && layout.remove) {
            layout.remove();
        }



        if (_.isFunction(page.onStart)) {
            page.onStart.call(page, function () {
                var LayoutView = Layout;
                var options = page.layout.options;

                layout = new LayoutView(options);
                layout.setElement($el);
                if (options.template) {
                    layout.template = options.template;
                }
                layout.render();
            });
        }
    });

    mediator.on('router:start', function () {
        //обработка кликов по ссылкам
        $('body')
            .on('click', 'a[href^="/"]', function (event) {
                if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                    var path = $(event.currentTarget).attr('href');
                    event.preventDefault();
                    router.goToUrl(path);
                }
            });
    });


    router.start();
});

module.exports.structure = structure;
module.exports.init = function () {
    mainApp.start();
};
