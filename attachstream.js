var canUseURL = typeof window.URL != 'undefined';

module.exports = function(stream, el, opts, callback) {

  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  function ready() {
    var autoplay = (opts || {}).autoplay;

    el.removeEventListener('canplay', ready);
    el.removeEventListener('loadedmetadata', ready);

    if (typeof autoplay == 'undefined' || autoplay) {
      el.play();
    }

    callback();
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
