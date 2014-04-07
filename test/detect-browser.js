var detect = require('../detect');
var test = require('tape');

test('version has been detected', function(t) {
  t.plan(4);
  t.ok(detect.version, 'version property set');
  t.ok(detect.browserVersion, 'version also in browserVersion property');
  t.equal(detect.version, detect.browserVersion, 'property values match');
  t.equal(typeof detect.version, 'string', 'value of version is a string');
});

test('browser has been detected', function(t) {
  t.plan(3);
  t.ok(detect.browser, 'browser has been detected');
  t.equal(typeof detect.browser, 'string', 'browser value is a string');
  t.equal(detect.browser, detect.browser.toLowerCase(), 'browser reported all in lowercase');
});