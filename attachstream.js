var canUseURL = typeof window.URL != 'undefined';

module.exports = function(el, stream, callback) {

  function ready() {
    el.removeEventListener('canplay', ready);
    el.removeEventListener('loadedmetadata', ready);
  }

  // check for srcObject
  if (typeof el.srcObject != 'undefined') {
    video.srcObject = stream;
  }
  // check for mozSrcObject
  else if (typeof el.mozSrcObject != 'undefined') {
    el.mozSrcObject = stream;
  }
  else {
    el.src = canUseURL ? URL.createObjectURL(stream) : stream;
  }

  // if no callback has been provided, return without monitoring the readiness
  if (! callback) {
    return;
  }

  // if the video is ready now, then capture the frame
  if (el.readyState >= 3) {
    return callback();
  }
  else {
    el.addEventListener('canplay', ready, false);
    el.addEventListener('loadedmetadata', ready, false);
  }

};
