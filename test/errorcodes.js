var errorcodes = require('../errorcodes'),
	test = require('tape');

test('errorcodes have not been changed', function(t) {
	// plan that we need to test all errorcodes
	// when new error codes are added, if they are not tested this will complain
	t.plan(Object.keys(errorcodes).length);
	t.equal(errorcodes.HANDSHAKE_IN_PROGRESS, 'HSIP');
	t.equal(errorcodes.SIMULTANEOUS_DIAL, 'HSSIM');
});