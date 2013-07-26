/* jshint node: true */

'use strict';

/**
## Core Error Codes
**/

// create the codes array
var codes = module.exports = function() {
  return Object.keys(codes).map(function(longCode) {
    return codes[longCode];
  }).filter(function(value) {
    return typeof value == 'string';
  });
};

/*
__NOTE:__ Error codes listed here cannot be changed.  Once an errorcode
has been allocated a value, then any changes could cause major 
problems between client and server components in the rtc.io stack.
*/
var messages = {
  HSIP: 'An existing handshake is already in progress',
  HSSIM: 'A handshake process has been initiated by the target endpoint',
  REQCHAN: 'A channel is required to initiate a peer connection'
};

/**
### HSIP

Handshake in Progress.  
**/
codes.HANDSHAKE_IN_PROGRESS = 'HSIP';

/**
### HSSIM

Simultaneous Dial.
*/
codes.SIMULTANEOUS_DIAL = 'HSSIM';

/**
### REQCHAN

This error condition is encountered when a peer connection is used without
being assigned a valid signalling channel to start with.
**/
codes.REQUIRE_CHANNEL = 'REQCHAN';

codes.toError = function(code) {
  var msg = messages[code] || 'An unknown RTC error has occurred';
  var error = new Error(msg);

  error.code = code;

  return error;
};
