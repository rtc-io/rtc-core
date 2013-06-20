/**
# rtc.io errorcodes

__NOTE:__ Error codes listed here cannot be changed.  Once an errorcode
has been allocated a value, then any changes could cause major 
problems between client and server components in the rtc.io stack.
*/
module.exports = {
    // handshake errors
    HANDSHAKE_IN_PROGRESS: 'HSIP',
	SIMULTANEOUS_DIAL: 'HSSIM'
};
