var detect = require('../detect');
var match = require('../match');
var test = require('tape');

test('the current browser matches', function(t) {
  t.plan(1);
  t.ok(match(detect.browser), 'ok');
});
