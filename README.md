# rtc-core

The rtc-core package includes a number of core types and constants that
are used across the rtc.io suite.


[![NPM](https://nodei.co/npm/rtc-core.png)](https://nodei.co/npm/rtc-core/)

[![Build Status](https://img.shields.io/travis/rtc-io/rtc-core.svg?branch=master)](https://travis-ci.org/rtc-io/rtc-core) [![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/dominictarr/stability#unstable) 

### `rtc-core/detect`

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

### `rtc-core/genice`

Respond appropriately to options that are passed to packages like
`rtc-quickconnect` and trigger a `callback` (error first) with iceServer
values.

The function looks for either of the following keys in the options, in
the following order or precedence:

1. `ice` - this can either be an array of ice server values or a generator
   function (in the same format as this function).  If this key contains a
   value then any servers specified in the `iceServers` key (2) will be
   ignored.

2. `iceServers` - an array of ice server values.

### `rtc-core/reset`

This is a simple, cross-browser method for resetting a media element
back to a initial state after having media attached.

### `rtc-core/wait-connected`

`waitConnected(pc, callback)`

A simple helper function that will monitor `iceconnectionstatechange` events
and wait until a connected `iceConnectionState` has been triggered (either
`connected` or `completed`).  Once this state has been achieved the event
listener will be removed and a callback fired.

## License(s)

### Apache 2.0

Copyright 2013 - 2014 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
