var detect = require('./detect');
var match = require('./match');
var url = require('url');

function useNewFormat() {
  return match('firefox') || match('chrome', '>=36');
}

module.exports = function(server) {
  var uri;
  var auth;

  // if we have a url parameter parse it
  if (server && server.url && useNewFormat()) {
    uri = url.parse(server.url);
    auth = (uri.auth || '').split(':');

    return {
      url: uri.protocol + uri.host,
      urls: [ uri.protocol + uri.host ],
      username: auth[0],
      credential: auth[1]
    };
  }

  return server;
};
