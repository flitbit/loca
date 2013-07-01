"use strict";

var extend = require('extend')
, dbc = require('dbc.js')
;

var subtagKinds = {
	language: 'language'
	, script: 'script'
	, region: 'region'
	, variant: 'variant'
	, extension: 'extension'
	, privateuse: 'privateuse'
}
, defaults = {
	subtag: ''
	, kind: subtagKinds.language
	, description: ''
	, localizedDescription: ''
	, scope: undefined
	, added: undefined
	, deprecated: undefined
	, preferredValue: undefined
	, comments: undefined
	, prefix: undefined
}
, subtagValidators = {
	language: /[A-Za-z]{2,3}(?:-[A-Za-z]{3})?/
	, script: /[A-Za-z]{4}/
	, region: /[A-Za-z]{2}|[0-9]{3}/
	, variant: /[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}/
	, extension: /[A-Za-z0-9](?:-[A-Za-z0-9]{2,8})+/
	, privateuse: /[xX](?:-[A-Za-z0-9]{1,8})+/
}
;

function LanguageSubTag (from) {
	var args = extend({}, defaults, from)
	, subtag: args.subtag
	, kind: args.kind
	, description: args.description
	, localizedDescription: args.localizedDescription
	, scope: args.scope
	, added: args.added
	, deprecated: args.deprecated
	, preferredValue: args.preferredValue
	, comments: args.comments
	, prefix: args.prefix
	;

	dbc([subtag], 'a subtag value is required');
	dbc([kind], 'a kind value is required');
	if(subtagValidators[kind]) {
		dbc([subtagValidators[kind].test(subtag)], 'the subtag value for the given kind is in an invalid format');
	}

	Object.defineProperties(this, {
		subtag: { enumerable: true, value: subtag }
		, kind: { enumerable: true, value: kind }
		, description: { enumerable: true, value: description }
		, localizedDescription: { enumerable: true, value: localizedDescription }
		, scope: { enumerable: true, value: scope }
		, added: { enumerable: true, value: added }
		, deprecated: { enumerable: true, value: deprecated }
		, preferredvalue: { enumerable: true, value: preferredvalue }
		, comments: { enumerable: true, value: comments }
		, prefix: { enumerable: true, value: prefix }
	})
}

Object.defineProperties(LanguageSubTag.prototype, {
	kinds: {
		value: subtagKinds
	}
	, validators: {
		value: subtagValidators
	}
});

module.exports = LanguageSubTag;