var EventEmitter = require('events').EventEmitter,
	util = require('util'),
	pull = require('pull-stream'),
	uuid = require('uuid');

function Peer(opts) {
	if (! (this instanceof Peer)) return new Peer(opts);

	// inherited
	EventEmitter.call(this);

	// initialise opts
	opts = opts || {};

	// initialise the peer id
	this.id = opts.id || uuid.v4();

	// initialise the messages array
	this._messages = [];
}

util.inherits(Peer, EventEmitter);
module.exports = Peer;


/**
## downstream()

The downstream function is used to return a pull-stream sink that data can be
written to for the server representation of the peer to process.

As data is fed into the sink, data events are emitted and if the stream ends
we get a 'disconnect' event for the peer.
*/
Peer.prototype.downstream = function() {
	var peer = this;

	return pull.Sink(function(read) {
		read(null, function next(end, data) {
			if (end) return peer.emit('disconnect');

			peer.emit('data');
			read(null, next);			 
		});
	});
};

/**
## send(data)
*/
Peer.prototype.send = function() {
	var data, msgIndex;

	// look for objects and convert to strings
	data = [].slice.call(arguments).map(function(arg) {
		if (typeof arg == 'object' && (! (arg instanceof String))) {
			return JSON.stringify(arg);
		}

		return arg;
	}).join('|');

	// add data into the messages array
	this._messages[msgIndex = this._messages.length] = data;
	this.emit('send', data, msgIndex);
};

/**
## upstream()

The upstream function is used to return a pull-stream source that will
supply messages that need to be sent "up-stream" to the connected peer.
*/
Peer.prototype.upstream = function() {
	var peer = this,
		msgIndex = 0;

	return pull.Source(function() {
		return function(end, cb) {
			if (end) return cb(end);

			// on a reset event, reset the message index to 0
			peer.on('reset', function() {
				msgIndex = 0;
			});

			peer.once('close', function() {
				cb(true);
			});

			// while the message index is less than the current length
			// provide that data to the callback
			if (msgIndex < peer._messages.length) {
				return cb(null, peer._messages[msgIndex++]);
			}

			// otherwise, wait for new data
			peer.on('send', function(data, index) {
				msgIndex = index;
				cb(null, data);
			});		
		};
	});
};
