var test = require('tape');
var detect = require('../detect');

test('can detect RTCPeerConnection', function(t) {
  var PeerConnectionClass;
  var peer;

  t.plan(3);
  PeerConnectionClass = detect('RTCPeerConnection');
  t.ok(PeerConnectionClass, 'detected RTCPeerConnection constructor');
  t.ok(peer = new PeerConnectionClass({ iceServers: [] }), 'created peer');
  t.ok(typeof peer.createOffer == 'function', 'peer has a createOffer function');
});