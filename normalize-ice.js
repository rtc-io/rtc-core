var detect = require('./detect');
var url = require('url');

module.exports = function(server) {
  var uri;
  var auth;

  // if we have a url parameter parse it
  if (server && server.url) {
    uri = url.parse(server.url);
    auth = (uri.auth || '').split(':');

    return {
      url: uri.protocol + uri.host + (uri.search || ''),
      urls: [ uri.protocol + uri.host + (uri.search || '') ],
      username: auth[0],
      credential: server.credential || auth[1]
    };
  }

  return server;
};
