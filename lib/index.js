


function isConfigured() {
	return signer.isConfigured
		&& verifier.isConfigured
		&& parser.isConfigured
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