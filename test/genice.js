var test = require('tape');
var genice = require('../genice');
var freeice = require('freeice');

test('genice: when provided iceServers genice will return those values', function(t) {
  var testValues = freeice();

  t.plan(3);
  genice({ iceServers: testValues }, function(err, iceServers) {
    t.ifError(err, 'no error');
    t.ok(Array.isArray(iceServers), 'got an ice servers array');
    t.deepEqual(iceServers, testValues, 'matched provided values');
  });
});

test('genice: when provided ice genice will return those values', function(t) {
  var testValues = freeice();

  t.plan(3);
  genice({ ice: testValues }, function(err, iceServers) {
    t.ifError(err, 'no error');
    t.ok(Array.isArray(iceServers), 'got an ice servers array');
    t.deepEqual(iceServers, testValues, 'matched provided values');
  });
});

test('genice: when provided a generator function, genice will execute the generator and return the values', function(t) {
  var testValues = freeice();

  function generator(opts, callback) {
    setTimeout(function() {
      callback(null, testValues);
    }, 500);
  };

  t.plan(3);
  genice({ ice: generator }, function(err, iceServers) {
    t.ifError(err, 'no error');
    t.ok(Array.isArray(iceServers), 'got an ice servers array');
    t.deepEqual(iceServers, testValues, 'matched provided values');
  });
});
