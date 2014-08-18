CONNECTED_STATES = ['connected', 'completed'];

module.exports = function(pc, callback) {
  function handleChange() {
    if (CONNECTED_STATES.indexOf(pc.iceConnectionState) >= 0) {
      pc.removeEventListener('iceconnectionstatechange', handleChange);
      callback();
    }
  }

  pc.addEventListener('iceconnectionstatechange', handleChange);
};
