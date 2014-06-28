var test = require('tape');
var detect = require('../detect.js');
var normalize = require('../normalize-ice');
var RTCPeerConnection = detect('RTCPeerConnection');

var stunFormatA = [
  { url: 'stun:stun.l.google.com:19302' }
];

var turnFormatA = [
  { url: 'turn:tmp:test@example.org:3478' },
  { url: 'turn:tmp@example.org:3478', credential: 'test' },
  { url: 'turn:tmp@example.org', credential: 'test' },
  { url: 'turn:tmp@example.org?transport=tcp', credential: 'test' }
];

test('normalizing turn url with embedded username:credential', function(t) {
  var server;

  t.plan(5);
  t.ok(server = normalize(turnFormatA[0]));
  t.equal(server.url, 'turn:example.org:3478');
  t.deepEqual(server.urls, ['turn:example.org:3478']);
  t.equal(server.username, 'tmp');
  t.equal(server.credential, 'test');
});

test('normalizing turn url with embedded username', function(t) {
  var server;

  t.plan(5);
  t.ok(server = normalize(turnFormatA[1]));
  t.equal(server.url, 'turn:example.org:3478');
  t.deepEqual(server.urls, ['turn:example.org:3478']);
  t.equal(server.username, 'tmp');
  t.equal(server.credential, 'test');
});

test('normalizing turn url with embedded username (no port)', function(t) {
  var server;

  t.plan(5);
  t.ok(server = normalize(turnFormatA[2]));
  t.equal(server.url, 'turn:example.org');
  t.deepEqual(server.urls, ['turn:example.org']);
  t.equal(server.username, 'tmp');
  t.equal(server.credential, 'test');
});

test('normalizing turn url with embedded username (transport specified)', function(t) {
  var server;

  t.plan(5);
  t.ok(server = normalize(turnFormatA[3]));
  t.equal(server.url, 'turn:example.org?transport=tcp');
  t.deepEqual(server.urls, ['turn:example.org?transport=tcp']);
  t.equal(server.username, 'tmp');
  t.equal(server.credential, 'test');
});

if (typeof RTCPeerConnection != 'undefined') {
  test('can create a connection with a single stun server', function(t) {
    var config;
    var pc;

    t.plan(2);
    t.ok(config = { iceServers: [ stunFormatA[0] ].map(normalize) }, 'created config');
    t.ok(pc = new RTCPeerConnection(config), 'created pc');
  });

  test('can create a connection with a single turn server', function(t) {
    var config;
    var pc;

    t.plan(2);
    t.ok(config = { iceServers: [ turnFormatA[0] ].map(normalize) }, 'created config');
    t.ok(pc = new RTCPeerConnection(config), 'created pc');
  });

  test('can create a connection with a single turn server (no port)', function(t) {
    var config;
    var pc;

    t.plan(2);
    t.ok(config = { iceServers: [ turnFormatA[1] ].map(normalize) }, 'created config');
    t.ok(pc = new RTCPeerConnection(config), 'created pc');
  });

  test('can create a connection with multiple turn servers', function(t) {
    var config;
    var pc;

    t.plan(2);
    t.ok(config = { iceServers: turnFormatA.map(normalize) }, 'created config');
    t.ok(pc = new RTCPeerConnection(config), 'created pc');
  });
}
