var plugin = require('../plugin');
var test = require('tape');

// include the test plugins
var pluginSupported = require('./plugins/supported-valid');
var pluginInvalid = require('./plugins/supported-invalid');
var pluginUnsupported = require('./plugins/unsupported');

test('a valid, supported plugin will be accepted', function(t) {
  t.plan(1);
  t.ok(plugin([pluginSupported]) === pluginSupported, 'ok');
});

test('a valid, supported plugin will be accepted (not array input)', function(t) {
  t.plan(1);
  t.ok(plugin(pluginSupported) === pluginSupported, 'ok');
});

test('an invalid plugin will not be accepted', function(t) {
  t.plan(1);
  t.notOk(plugin([pluginInvalid]), 'ok - no plugin available');
});

test('an unsupported plugin will not be accepted', function(t) {
  t.plan(1);
  t.notOk(plugin([pluginUnsupported]), 'ok - no plugin available');
});

test('when multiple plugins are provided, only the supported valid plugin will be returned', function(t) {
  t.plan(1);
  t.ok(plugin([pluginInvalid, pluginUnsupported, pluginSupported]) === pluginSupported, 'ok');
});
