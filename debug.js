/* jshint node: true */
/* global console: false */
'use strict';

var activeSections = ['*'];

/**
  ## rtc/lib/debug

  Debug helper, usage is similar to
  [visionmedia/debug](https://github.com/visionmedia/debug):

  ```
  var debug = require('rtc/lib/debug')('sectionname');

  debug('Found blah');
  ```
**/
var debug = module.exports = function(section) {
  var enabled = activeSections.indexOf(section) >= 0 ||
    activeSections.indexOf('*') >= 0;

  return function(message) {
    if (! enabled) return;

    console.log.apply(
      console, 
      [section + ': ' + message].concat([].slice.call(arguments, 1))
    );
  };
};

// export the active sections
debug.active = activeSections;