var test = require('tape');
var peerpair = require('peerpair');
var waitConnected = require('../wait-connected');
var RTCPeerConnection = require('../detect')('RTCPeerConnection');
var peers = [
  new RTCPeerConnection({ iceServers: [] }),
  new RTCPeerConnection({ iceServers: [] })
];

test('can wait for peers to connect successfully', function(t) {
  var pair = peerpair(peers);

  t.plan(3);

  waitConnected(peers[0], t.pass.bind(t, 'c:0 connected'));
  waitConnected(peers[1], t.pass.bind(t, 'c:1 connected'));
  pair.events.once('connected', t.pass.bind(t, 'peerpair registered connected'));

  pair.createChannelsAndConnect('test');
});
