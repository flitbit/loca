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
;

function _validateValue (val, re) {
	var result = false
	;
	if(typeof val === 'string') {
		result = re.test(val);
	}
	return result;
}

function validateLanguage (val) {
	var re = /^[A-Za-z]{2,3}(?:-[A-Za-z]{3})?$/
	;
	return _validateValue(val, re);
}

function validateScript (val) {
	var re = /^[A-Za-z]{4}$/
	;
	return _validateValue(val, re);	
}

function validateRegion (val) {
	var re = /^[A-Za-z]{2}|[0-9]{3}$/
	;
	return _validateValue(val, re);	
}

function validateVariant (val) {
	var re = /^[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}$/
	;
	return _validateValue(val, re);	
}

function validateExtension (val) {
	var re = /^[A-WYZa-wyz0-9](?:-[A-Za-z0-9]{2,8})+$/
	;
	return _validateValue(val, re);	
}

function validatePrivateUse (val) {
	var re = /^[xX](?:-[A-Za-z0-9]{1,8})+$/
	;
	return _validateValue(val, re);	
}

function LanguageSubTag (from) {
	var args = extend({}, defaults, from)
	, subtag = args.subtag
	, kind = args.kind
	, description = args.description
	, localizedDescription = args.localizedDescription
	, scope = args.scope
	, added = args.added
	, deprecated = args.deprecated
	, preferredValue = args.preferredValue
	, comments = args.comments
	, prefix = args.prefix
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

Object.defineProperties(LanguageSubTag, {
	kinds: {
		value: subtagKinds
	}
	, validateLanguage: {
		value: function (language) {
			dbc([language], 'language must be a string');

			return validateLanguage(language);
		}
	}
	, validateScript: {
		value: function (script) {
			dbc([script], 'script must be a string');

			return validateScript(script);
		}
	}
	, validateRegion: {
		value: function (region) {
			dbc([region], 'region must be a string');

			return validateRegion(region);
		}
	}
	, validateVariant: {
		value: function (variant) {
			dbc([variant], 'variant must be a string');

			return validateVariant(variant);
		}
	}
	, validateExtension: {
		value: function (extension) {
			dbc([extension], 'extension must be a string');

			return validateExtension(extension);
		}
	}
	, validatePrivateUse: {
		value: function (privateUse) {
			dbc([privateUse], 'privateUse must be a string');

			return validatePrivateUse(privateUse);
		}
	}
});

module.exports = LanguageSubTag;