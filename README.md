# rtc-core

The rtc-core package includes a number of core types and constants that
are used across the rtc.io suite.

## rtc-core/detect

A browser detection helper for accessing prefix-free versions of the various
WebRTC types. 

### Example Usage

If you wanted to get the native `RTCPeerConnection` prototype in any browser
you could do the following:

```js
var detect = require('rtc-core/detect'); // also available in rtc/detect
var RTCPeerConnection = detect('RTCPeerConnection');
```

This would provide whatever the browser prefixed version of the
RTCPeerConnection is available (`webkitRTCPeerConnection`, 
`mozRTCPeerConnection`, etc).

## Core Error Codes

### HSIP

Handshake in Progress.

### REQCHAN

This error condition is encountered when a peer connection is used without
being assigned a valid signalling channel to start with.

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
