var detect = require('../detect');
var match = require('../match');

if (match('chrome', '>= 35')) {
  console.log('matched >= chrome 35, actual version: ' + detect.version);
}
else if (match('chrome', '32 - 34')) {
  console.log('matched chrome 32 - 34, actual version: ' + detect.version);
}
else if (match('chrome', '^31')) {
  console.log('matched chrome 31, actual version: ' + detect.version)
}
else if (match('chrome')) {
  console.log('matched chrome (any version), actual version: ' + detect.version);
}
else {
  console.log('not running chrome, browser: ' + detect.browser + ', version: ' + detect.version);
}