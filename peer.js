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
	this.closed = false;

	// initialise the messages array
	this._messages = [];
}

util.inherits(Peer, EventEmitter);
module.exports = Peer;

/**
## close()

Close the current peer outbound sources
*/
Peer.prototype.close = function() {
	// flag as closed and emit the close event
	this.closed = true;
	this.emit('close');

	// trigger a send event to wakeup waiting pull-stream sources
	this.emit('send');
};


/**
## inbound()

The inbound function is used to return a pull-stream sink that represents 
inbound data for the peer.  As data is fed into the sink, data events are 
emitted and if the stream ends we get a 'disconnect' event for the peer.
*/
Peer.prototype.inbound = function() {
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
## outbound()

The outbound function is used to return a pull-stream source that will
supply messages that need to be sent out from the peer.
*/
Peer.prototype.outbound = function() {
	var peer = this,
		msgIndex = 0,
		source;

	// create the pull-source factory
	source = pull.Source(function() {
		var closed = false;

		// on a reset event, reset the message index to 0
		peer.on('reset', function() {
			msgIndex = 0;
		});

		peer.once('close', function() {
			closed = true;
		});	

		return function(end, cb) {
			if (end) return cb(end);

			// while the message index is less than the current length
			// provide that data to the callback
			if (msgIndex < peer._messages.length) {
				return cb(null, peer._messages[msgIndex++]);
			}

			// wait for data if we have exhausted the backlog
			peer.once('send', function handleSend(data, index) {
				if (peer.closed) return cb(true);

				// process the message
				msgIndex = index + 1;
				cb(null, data);
			});
		};
	});

	return source();
};

/** 
## reset()

Reset the message backlog
*/
Peer.prototype.reset = function() {
	// reset the messages list
	this._messages = [];

	// emit a reset event
	this.emit('reset');
};

/**
## send(data)
*/
Peer.prototype.send = function() {
	var data, msgIndex;

	// if the peer is closed, return false
	if (this.closed) return false;

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

	// return the message index
	return msgIndex;
};
