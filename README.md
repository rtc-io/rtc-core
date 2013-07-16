# rtc-core

The rtc-core package includes a number of core types and constants that
are used across the rtc.io suite.

## Peer prototype reference

The `Peer` prototype is a simple data type that helps the browser interface
with the streaming interfaces used by the signaller transports.

### close()

Close the current peer outbound sources

### inbound()

The inbound function is used to return a pull-stream sink that represents 
inbound data for the peer.  As data is fed into the sink, data events are 
emitted and if the stream ends we get a 'disconnect' event for the peer.

### outbound()

The outbound function is used to return a pull-stream source that will
supply messages that need to be sent out from the peer.

 
### reset()

Reset the message backlog

### send(data)
