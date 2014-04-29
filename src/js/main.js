//backbone setup
var _ = require('underscore');
var clientId = require('./settings').soundcloud.clientId;
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

require('./vendor/backbone.fetch-cache');

var _sync = Backbone.sync;

Backbone.sync = function (method, model, options) {

    options = options || {};
    options.data = options.data || {};

    options.contentType = 'application/json';
    options.dataType = 'jsonp';

    _.extend(options.data, {
        client_id: clientId,
        format: 'json'
    });

    return _sync.call(this, method, model, options);
};

//app init

var App = require('./App');

App.init();
