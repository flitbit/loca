'use strict';

var dbc = require('dbc.js')
;

function Term (definition) {
	var args = definition
	, _tenant = args.tenant
	, _name = args.name
	, _description = args.description
	, _languages = args.languages || { }
	, _default_language = args.default_language || 'en'
	;

	dbc([_tenant], 'a tenant value is required');
	dbc([_name], 'a name value is required');
	dbc([_languages], 'a languages value is required');
	dbc([_languages[_default_lang]], 'a languages.'.concat(_default_language, ' value is required'));

	Object.defineProperties(this, {
		tenant: { enumerable: true, value: _tenant }
		, name: { enumerable: true, value: _name }
		, description: { enumerable: true, value: _description }
		, languages: { enumerable: true, value: _languages }
		, default_lang: { enumerable: true, value: _default_lang }
	});
}

module.exports = Term;