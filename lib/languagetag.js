"use strict";

var extend = require('extend')
, dbc = require('dbc.js')
, subtag = require('./languagesubtag')
;

var defaults = {
	language: null
	, script: null
	, region: null
	, variants: []
	, extensions: []
	, privateUse: null
}
;

function _selectTagPart (langTag, regex) {
	var result = null
	, m = regex.exec(langTag)
	;

	if(m && m.length > 1) {
		result = m[1];
	}

	return result;
}

function _selectTagParts (langTag, regex) {
	var results = []
	, m = regex.exec(langTag)
	; 

	while(m && m.length > 1) {
		results[results.length] = m[1];
		m = regex.exec(langTag);
	}

	if(results.length === 0) {
		results = null;
	}

	return results;
}

function languageSelector () {
	return new RegExp('^([A-Za-z]{2,3}(?:\-[A-Za-z]{3})?)(?:\-|$)');
} 

function selectLanguage (langTag) {
	return _selectTagPart(langTag, languageSelector());
}

function scriptSelector () {
	return new RegExp('-([A-Za-z]{4})(?:-|$)');
}

function selectScript (langTag) {
	return _selectTagPart(langTag, scriptSelector());
}

function regionSelector () {
	return new RegExp('-([A-Za-z]{2}|[0-9]{3})(?:-|$)');
}

function selectRegion (langTag) {
	return _selectTagPart(langTag, regionSelector());
}

function variantSelector () {
	return new RegExp('-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})(?=-|$)', 'g');
}

function selectVariants (langTag) {
	var result = extend({}, defaults)
	;
	
	result.variants = _selectTagParts(langTag, variantSelector());

	// Filter out variants selected from extensions and privateUse values.
	// Would rather js regexp support lookbehind, but it does not...
	result.extensions = selectExtensions(langTag);
	result.privateUse = selectPrivateUse(langTag);
	var rem = [];
	if(result.extensions && result.extensions.length) {
		var e = result.extensions.join('-')
		;
		rem += selectVariants(e);
	}
	if(result.privateUse) {
		rem += selectVariants(result.privateUse);
	}

	if(rem.length) { 
		result.variants = result.variants.filter(function (e, i, a) {
			return rem.indexOf(e) === -1;
		});
	}

	return result.variants;
}

function extensionSelector () {
	return new RegExp('-([A-WYZa-wyz0-9](?:-[A-Za-z0-9]{2,8})+)(?=-|$)', 'g');
}

function selectExtensions (langTag) {
	return _selectTagParts(langTag, extensionSelector());
}

function privateUseSelector () {
	return new RegExp('-([xX](?:-[A-Za-z0-9]{1,8})+)$');
}

function selectPrivateUse (langTag) {
	return _selectTagPart(langTag, privateUseSelector());
}

function parse (langTag) {
	var result = extend({}, defaults)
	;
	
	result.language = selectLanguage(langTag);
	result.script = selectScript(langTag);
	result.region = selectRegion(langTag);
	result.variants = selectVariants(langTag);
	result.extensions = selectExtensions(langTag);
	result.privateUse = selectPrivateUse(langTag);

	return new LanguageTag(result);
}

function LanguageTag (subtags) {
	var args = extend({}, defaults, subtags)
	, language = args.language
	, script = args.script
	, region = args.region
	, variants = args.variants ? (Array.isArray(args.variants) ? args.variants : [args.variants]) : null
	, extensions = args.extensions ? (Array.isArray(args.extensions) ? args.extensions : [args.extensions]) : null
	, privateUse = args.privateUse
	;

	dbc([language], 'a language value is required');
	dbc([subtag.validateLanguage(language)], 'the given language value is not in the correct format');
	dbc([!script || subtag.validateScript(script)], 'the given script value is not in the correct format');
	dbc([!region || subtag.validateRegion(region)], 'the given region value is not in the correct format');
	if(variants && variants.length) {
		var v = -1
		;
		while (++v < variants.length) {
			dbc([subtag.validateVariant(variants[v])], 'a given variant value is not in the correct format');
		}
	}
	if(extensions && extensions.length) {
		var e = -1
		;
		while (++e < extensions.length) {
			dbc([subtag.validateExtension(extensions[e])], 'a given extension value is not in the correct format');
		}
	}
	dbc([!privateUse || subtag.validatePrivateUse(privateUse)], 'the given privateUse value is not in the correct format');

	Object.defineProperties(this, {
		language: { enumerable: true, value: language }
		, script: { enumerable: true, value: script }
		, region: { enumerable: true, value: region }
		, variants: { enumerable: true, value: variants }
		, extensions: { enumerable: true, value: extensions }
		, privateUse: { enumerable: true, value: privateUse }
		, toString: {
			enumerable: true
			, value: function () {
				var result = ''
				;
				if(this.language) {
					result = this.language;
					if(this.script) {
						result = result.concat('-', this.script);
					}
					if(this.region) {
						result = result.concat('-', this.region);
					}
					if(this.variants && this.variants.length) {
						var v = -1
						;
						while(++v < this.variants.length) {
							result = result.concat('-', this.variants[v]);
						}
					}
					if(this.extensions && this.extensions.length) {
						var e = -1
						;
						while(++e < this.extensions.length) {
							result = result.concat('-', this.extensions[e]);
						}
					}
					if(this.privateUse) {
						result = result.concat('-', this.privateUse);
					}
				}
				return result;
			}
		}
	});
}

Object.defineProperties(LanguageTag, {
	parse: { 
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a language tag string is required');

            return parse(langTag);
		}
	}
	, selectLanguage: {
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a language tag string is required');

			return selectLanguage(langTag);
		}
	}
	, selectScript: {
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a Language tag string is required');

			return selectScript(langTag);
		}
	}
	, selectRegion: {
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a Language tag string is required');

			return selectRegion(langTag);
		}
	}
	, selectVariants: {
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a Language tag string is required');

			return selectVariants(langTag);
		}
	}
	, selectExtensions: {
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a Language tag string is required');

			return selectExtensions(langTag);
		}
	}
	, selectPrivateUse: {
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a Language tag string is required');

			return selectPrivateUse(langTag);
		}
	}
});

module.exports = LanguageTag;