# rtc-core

The rtc-core package includes a number of core types and constants that
are used across the rtc.io suite.


[![NPM](https://nodei.co/npm/rtc-core.png)](https://nodei.co/npm/rtc-core/)

[![Build Status](https://img.shields.io/travis/rtc-io/rtc-core.svg?branch=master)](https://travis-ci.org/rtc-io/rtc-core)
![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)

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

## rtc-core/match

```
match(browser, spec?, fn?) ==> Boolean
```

The `match` helper is useful for customizing the behaviour of your WebRTC
application based on browser environment and also specific versions of
the browser (using a [semver](http://semver.org/) based spec).

```js
var detect = require('rtc-core/detect');
var match = require('rtc-core/match');

if (match('chrome', '>= 35')) {
  console.log('matched >= chrome 35, actual version: ' + detect.version);
}
else if (match('chrome', '32 - 34')) {
  console.log('matched chrome 32 - 34, actual version: ' + detect.version);
}
else if (match('chrome', '^31')) {
  console.log('matched chrome 31, actual version: ' + detect.version)
}
else if (match('chrome')) {
  console.log('matched chrome (any version), actual version: ' + detect.version);
}
else {
  console.log('not running chrome, browser: ' + detect.browser + ', version: ' + detect.version);
}
```

## rtc-core/reset

This is a simple, cross-browser method for resetting a media element
back to a initial state after having media attached.

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
