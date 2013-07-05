var test = require('tape'),
	pull = require('pull-stream'),
	pushable = require('pull-pushable'),
	Peer = require('../peer'),
	peer;

test('create a new peer', function(t) {
	t.plan(1);
	peer = new Peer();
	t.ok(peer.id, 'new peer created');
});

test('can send messages to the peer', function(t) {
	var messages = pushable();

	t.plan(1);

	pull(
		messages,
		peer.inbound()
	);

	peer.on('data', function(message) {
		t.equal(message, 'hello', 'received message successfully');
	});

	messages.push('hello');
});