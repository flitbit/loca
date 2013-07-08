

function isConfigured() {
	return true
		;
}

function $init($config) {
	if (typeof $config !== 'undefined' && !isConfigured()) {
	}
}

Object.defineProperties($init, {
	
	isConfigured: {
		get: isConfigured,
		enumerable: true
	}

});

module.exports = $init;