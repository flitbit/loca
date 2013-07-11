'use strict';

var dbc = require('dbc.js')
;

function Bundle (definition) {
	var args = definition
	, _tenant = args.tenant
	, _name = args.name
	, _terms = args.terms || []
	;

	Object.defineProperties(this, {
		tenant: {
			enumerable: true
			, value: _tenant
		}
		, name: {
			enumerable: true
			, value: _name
		}
		, terms: {
			enumerable: true
			, value: _terms
		}
	});
}

module.exports = Bundle;