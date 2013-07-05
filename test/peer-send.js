var test = require('tape'),
	Peer = require('../peer'),
	peer;

test('can create a new peer', function(t) {
	t.plan(1);

	peer = new Peer();
	t.ok(peer.id, 'Created a new peer and that peer has an id');
});

test('can send a message with the peer', function(t) {
	t.plan(1);

	peer.send('hi');
	t.equal(peer._messages.length, 1, '1 message sent, 1 message in messages list');
});