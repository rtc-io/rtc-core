/* jshint node: true */
'use strict';

var detect = require('./detect');
var semver = require('semver');

/**
  ## rtc-core/match

  ```
  match(browser, spec?, fn?) ==> Boolean
  ```

  The `match` helper is useful for customizing the behaviour of your WebRTC
  application based on browser environment and also specific versions of
  the browser (using a [semver](http://semver.org/) based spec).  The optional
  `fn` argument allows you to provide a function you wish to be called given
  a match rather as this is sometimes useful.

  <<< examples/match.js

**/
module.exports = function(browser, spec, fn) {
  var isMatch = false;
  var version = semver.clean(detect.version);

  if (typeof spec == 'function') {
    fn = spec;
    spec = '';
  }

  // ensure spec is a string value
  spec = spec || '';

  // if the version it not valid, then error out
  if (spec && (! version)) {
    throw new Error('Browser version is not semver compatible: ' + detect.version);
  }

  // first check the browser name
  if (browser instanceof RegExp) {
    isMatch = browser.test(detect.browser);
  }
  else {
    isMatch = browser === detect.browser;
  }

  // check the spec
  isMatch = isMatch && semver.satisfies(version, spec);

  // if we have a match and a handler, then invoke the handler
  if (isMatch && typeof fn == 'function') {
    fn();
  }

  return isMatch;
};