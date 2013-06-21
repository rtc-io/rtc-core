var errorcodes = require('../errorcodes'),
	test = require('tape');

test('error codes all have a valid error message', function(t) {
	// plan that we need to test all errorcodes
	// when new error codes are added, if they are not tested this will complain
	t.plan(errorcodes().length);

	// test that we have no generic methods
	errorcodes().forEach(function(code) {
		var error = errorcodes.toError(code);

		t.ok(error.message.toLowerCase().indexOf('unknown') < 0, 'Error code "' + code + '" requires an error message');
	});
});