/**
# rtc.io errorcodes

__NOTE:__ Error codes listed here cannot be changed.  Once an errorcode
has been allocated a value, then any changes could cause major 
problems between client and server components in the rtc.io stack.
*/
// create the codes array
var codes = module.exports = function() {
    return Object.keys(codes).map(function(longCode) {
        return codes[longCode]
    }).filter(function(value) {
        return typeof value == 'string'
    });
};

var messages = {
    HSIP: 'An existing handshake is already in progress',
    HSSIM: 'A handshake process has been initiated by the target endpoint'
};

// initialise the individual error codes
codes.HANDSHAKE_IN_PROGRESS = 'HSIP';
codes.SIMULTANEOUS_DIAL = 'HSSIM';

codes.toError = function(code) {
    var error = new Error(messages[code] || 'An unknown RTC error has occurred');
    error.code = code;

    return error;
};
