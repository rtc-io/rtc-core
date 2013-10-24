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

## rtc-core/reset

This is a simple, cross-browser method for resetting a media element
back to a initial state after having media attached.
