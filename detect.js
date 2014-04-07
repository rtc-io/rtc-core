/* jshint node: true */
/* global window: false */
/* global navigator: false */

'use strict';

var semver = require('semver');
var browsers = {
  chrome: /Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
  firefox: /Firefox\/([0-9\.]+)(?:\s|$)/,
  opera: /Opera\/([0-9\.]+)(?:\s|$)/
};

/**
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
**/
var detect = module.exports = function(target, prefixes) {
  var prefixIdx;
  var prefix;
  var testName;
  var hostObject = this || (typeof window != 'undefined' ? window : undefined);

  // if we have no host object, then abort
  if (! hostObject) {
    return;
  }

  // initialise to default prefixes
  // (reverse order as we use a decrementing for loop)
  prefixes = (prefixes || ['ms', 'o', 'moz', 'webkit']).concat('');

  // iterate through the prefixes and return the class if found in global
  for (prefixIdx = prefixes.length; prefixIdx--; ) {
    prefix = prefixes[prefixIdx];

    // construct the test class name
    // if we have a prefix ensure the target has an uppercase first character
    // such that a test for getUserMedia would result in a
    // search for webkitGetUserMedia
    testName = prefix + (prefix ?
                            target.charAt(0).toUpperCase() + target.slice(1) :
                            target);

    if (typeof hostObject[testName] != 'undefined') {
      // update the last used prefix
      detect.browser = detect.browser || prefix.toLowerCase();

      // return the host object member
      return hostObject[target] = hostObject[testName];
    }
  }
};

// detect mozilla (yes, this feels dirty)
detect.moz = typeof navigator != 'undefined' && !!navigator.mozGetUserMedia;

// time to do some useragent sniffing - it feels dirty because it is :/
if (typeof navigator != 'undefined') {
  Object.keys(browsers).forEach(function(key) {
    var match = browsers[key].exec(navigator.userAgent);
    if (match) {
      detect.browser = key;
      detect.browserVersion = detect.version = parseVersion(match[1]);
    }
  });
}
else {
  detect.browser = 'node';
  detect.browserVersion = detect.version = parseVersion(process.version.substr(1));
}

function parseVersion(version) {
  // get the version parts
  var versionParts = version.split('.').slice(0, 3);

  // while we don't have enough parts for the semver spec, add more zeros
  while (versionParts.length < 3) {
    versionParts.push('0');
  }

  // return the version cleaned version (hopefully)
  // falling back to the provided version if required
  return semver.clean(versionParts.join('.')) || version;
}