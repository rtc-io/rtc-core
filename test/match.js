var detect = require('../detect');
var match = require('../match');
var test = require('tape');
var semver = require('semver');

test('the current browser matches', function(t) {
  t.plan(1);
  t.ok(match(detect.browser), 'ok');
});

test('the current browser matches the semver friendly version', function(t) {
  t.plan(2);

  t.ok(semver.clean(detect.version), 'version is semver compatible');
  t.ok(match(detect.browser, detect.version), 'matched');
});

test('the current browser matches using the ^0.0.0 spec', function(t) {
  t.plan(2);

  t.ok(semver.clean(detect.version), 'version is semver compatible');
  t.ok(match(detect.browser, '^' + detect.version), 'matched');
});

test('the current browser matches using the ^0 spec', function(t) {
  t.plan(2);

  t.ok(semver.clean(detect.version), 'version is semver compatible');
  t.ok(match(detect.browser, '^' + detect.version.split('.')[0]), 'matched');
});
