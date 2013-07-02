"use strict";

var extend = require('extend')
, dbc = require('dbc.js')
;

function languageSelector () {
	return new RegExp('^([A-Za-z]{2,3}(?:-[A-Za-z]{3})?)-|$');
} 

function scriptSelector () {
	return new RegExp('-([A-Za-z]{4})-|$');
}

function regionSelector () {
	return new RegExp('-([A-Za-z]{2}|[0-9]{3})-|$');
}

function variantSelector () {
	return new RegExp('-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})-|$');
}

function extensionSelector () {
	return new RegExp('-([A-WYZa-wyz0-9](?:-[A-Za-z0-9]{2,8})+)-|$');
}

function privateuseSelector () {
	return new RegExp('-([xX](?:-[A-Za-z0-9]{1,8})+)$');
}	

function LanguageSubTagSelectors () { 
	Object.defineProperties(LanguageSubTagSelectors.prototype, {
		language: {
			value: languageSelector
		}
		, script: {
			value: scriptSelector
		}
		, region: {
			value: regionSelector
		}
		, variant: {
			value: variantSelector
		}
		, extension: { 
			value: extensionSelector
		}
		, privateuse: {
			value: privateuseSelector
		}
	});
}

var subtagKinds = {
	language: 'language'
	, script: 'script'
	, region: 'region'
	, variant: 'variant'
	, extension: 'extension'
	, privateuse: 'privateuse'
}
, subtagValidators = {
	language: '[A-Za-z]{2,3}(?:-[A-Za-z]{3})?'
	, script: '[A-Za-z]{4}'
	, region: '[A-Za-z]{2}|[0-9]{3}'
	, variant: '[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}'
	, extension: '[A-WYZa-wyz0-9](?:-[A-Za-z0-9]{2,8})+'
	, privateuse: '[xX](?:-[A-Za-z0-9]{1,8})+'
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
	, _selectors = new LanguageSubTagSelectors();
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
		, selectors: { value: _selectors }
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