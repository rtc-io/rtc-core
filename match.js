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
  the browser (using a [semver](http://semver.org/) based spec).

**/
module.exports = function(browser, spec, fn) {
  var isMatch = false;

  if (typeof spec == 'function') {
    fn = spec;
    spec = '*';
  }

  // if the spec has not been defined (or is invalid), default to '*'
  spec = semver.clean(spec) || '*';

  // first check the browser name
  if (browser instanceof RegExp) {
    isMatch = browser.test(detect.browser);
  }
  else {
    isMatch = browser === detect.browser;
  }

  // check the spec
  isMatch = isMatch && semver.satisfies(detect.version, spec);

  // if we have a match and a handler, then invoke the handler
  if (isMatch && typeof fn == 'function') {
    fn();
  }

  return isMatch;
};