var test = require('tape');
var detect = require('../detect.js');
var normalize = require('../normalize-ice');
var RTCPeerConnection;

var stunFormatA = [
  { url: 'stun:stun.l.google.com:19302' }
];

var turnFormatA = [
  { url: 'turn:tmp:test@hoth.rtc.io:3478' },
  { url: 'turn:tmp:test@hoth.rtc.io' }
];

test('can detect an RTCPeerConnection constructor', function(t) {
  t.plan(1);
  t.ok(RTCPeerConnection = detect('RTCPeerConnection'));
});

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
