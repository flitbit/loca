var lib = require('./lib')
, extend = require('extend')
;

function isConfigured() {
	return lib.isConfigured;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
		lib($config);
	}
}

extend($init, lib);

Object.defineProperty($init, 'isConfigured', {
	get: isConfigured,
	enumerable: true
});

module.exports = $init;