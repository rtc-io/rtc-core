CONNECTED_STATES = ['connected', 'completed'];

/**
  ### `rtc-core/wait-connected`

  `waitConnected(pc, callback)`

  A simple helper function that will monitor `iceconnectionstatechange` events
  and wait until a connected `iceConnectionState` has been triggered (either
  `connected` or `completed`).  Once this state has been achieved the event
  listener will be removed and a callback fired.

**/
module.exports = function(pc, callback) {
  function handleChange() {
    if (CONNECTED_STATES.indexOf(pc.iceConnectionState) >= 0) {
      pc.removeEventListener('iceconnectionstatechange', handleChange);
      callback();
    }
  }

  pc.addEventListener('iceconnectionstatechange', handleChange);
};
