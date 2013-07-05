var test = require('tape'),
	pull = require('pull-stream'),
	pushable = require('pull-pushable'),
	Peer = require('../peer');

test('create a new peer', function(t) {
	var peer;

	t.plan(1);
	peer = new Peer();
	t.ok(peer.id, 'new peer created');
});

test('can send messages to the peer', function(t) {
	var messages = pushable(),
		peer = new Peer();

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

test('triggers a disconnect event when the incoming stream ends', function(t) {
	var messages = pushable(),
		peer = new Peer();

	t.plan(1);

	pull(
		messages,
		peer.inbound()
	);

	peer.on('disconnect', function() {
		t.pass('received a disconnect event');
	});

	messages.push('hello');
	messages.end();
});