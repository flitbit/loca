'use strict';

var dbc = require('dbc.js')
;

function Term (definition) {

	var args = definition
	, name = args.name
	, description = args.description
	, languages = args.languages
	, default_lang = args.default_lang
	;

	Object.defineProperties(this, {
		name: { enumerable: true, value: name },
		description: { enumerable: true, value: description },
		languages: { enumerable: true, value: languages },
		default_lang: { enumerable: true, value: default_lang }
	});
}