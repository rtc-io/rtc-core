var test = require('tape'),
	pull = require('pull-stream'),
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

test('can drain outbound messages from the peer', function(t) {
	t.plan(peer._messages.length);
	pull(
		peer.outbound(),
		pull.drain(function(data) {
			t.pass('drained data: ' + data);
		})
	);
});

test('can close the peer', function(t) {
	t.plan(2);

	pull(
		peer.outbound(),
		pull.drain(null, function() {
			t.pass('stream has ended as expected')
		})
	);

	peer.once('close', function() {
		t.pass('peer has emitted the close event');
	});

	peer.close();
});

test('ensure we cannot send when the peer is closed', function(t) {
	t.plan(1);
	t.equal(peer.send('hello'), false, 'peer rejected send attempt');
});

test('create a new peer', function(t) {
	t.plan(1);

	peer = new Peer();
	t.ok(peer.id, 'new peer created');
});

test('new messages are passed through to outbound streams', function(t) {
	t.plan(2);

	pull(
		peer.outbound(),
		pull.drain(function(data) {
			t.pass('received data: ' + data);
		})
	);

	peer.send('hello');
	peer.send('hello again');
	peer.close();
});

test('create another test peer', function(t) {
	t.plan(1);

	peer = new Peer();
	t.ok(peer.id, 'new peer created');
});

test('can reset a peer', function(t) {
	t.plan(3);

	peer.once('reset', function() {
		t.pass('reset event fired');
	});

	peer.send('a');
	peer.send('b');
	t.equal(peer._messages.length, 2, 'Messages added to the backlog');

	peer.reset();
	t.equal(peer._messages.length, 0, 'No messages in backlog');
});

test('can stream messages after a reset', function(t) {
	t.plan(2);

	peer.outbound().pipe(pull.drain(
		function(data) {
			t.equal(data, 'hello', 'Received data as expected');
		}, 
		function() {
			t.pass('stream ended as expected');
		}
	));

	peer.send('hello');
	peer.close();
});