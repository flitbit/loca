"use strict";

var extend = require('extend')
, dbc = require('dbc.js')
, subtag = require('./languagesubtag.js')
;

var defaults = {
	language: undefined
	, script: undefined
	, region: undefined
	, variants: []
	, extensions: []
	, privateuse: undefined
}

function LanguageTag (subtags) {
	var args = extend({}, defaults, subtags)
	, language = args.language
	, script = args.script
	, region = args.region
	, variants = args.variants ? (Array.isArray(args.variants) ? args.variants : [args.variants]) : undefined
	, extensions = args.extensions ? (Array.isArray(args.extensions) ? args.extensions : [args.extensions]) : undefined
	, privateuse = args.privateuse
	;

	dbc([language], 'a language value is required');
	dbc([subtag.validators.language.test(language)], 'the given language value is not in the correct format');
	dbc([!script || subtag.validators.script.test(script)], 'the given script value is not in the correct format');
	dbc([!region || subtag.validators.region.test(region)], 'the given region value is not in the correct format');
	if(variants && variants.length) {
		var v = -1
		;
		while (++v < variants.length) {
			dbc([subtag.validators.variant.test(variants[v])], 'a given variant value is not in the correct format');
		}
	}
	if(extensions && extensions.length) {
		var e = -1
		;
		while (++e < extensions.length) {
			dbc([subtag.validators.extension.test(extensions[e])], 'a given extension value is not in the correct format');
		}
	}
	dbc([!privateuse || subtag.validators.privateuse.test(privateuse)], 'the given privateuse value is not in the correct format');

	Object.defineProperties(this, {
		language: { enumerable: true, value: language }
		, script: { enumerable: true, value: script }
		, region: { enumerable: true, value: region }
		, variants: { enumerable: true, value: variants }
		, extensions: { enumerable: true, value: extensions }
		, privateuse: { enumerable: true, value: privateuse }
		, toString: {
			enumerable: true
			, value: function () {
				var result = ''
				;
				if(this.language) {
					result.concat(this.language);
					if(this.script) {
						result.concat('-', this.script);
					}
					if(this.region) {
						result.concat('-', this.region);
					}
					if(this.variants && this.variants.length > 0) {
						var i = -1
						;
						while(++i < this.variants.length) {
							result.concat('-', this.variants[i]);
						}
					}
					if(this.extensions && this.extensions.length > 0) {
						var i = -1
						;
						while(++i < this.extensions.length) {
							result.concat('-', this.extensions[i]);
						}
					}
					if(this.privateuse) {
						result.concat('-', this.privateuse);
					}
				}
				return result;
			}
		});
}

Object.defineProperties(LanguageTag.prototype, {
	parse: { 
		enumerable: true
		, value: function (langTag) {
			dbc([langTag], 'a language tag string is required');

            var result          = extend({}, defaults)
            , languageMatch     = subtag.selectors.language().exec(langTag)
            , scriptMatch       = subtag.selectors.script().exec(langTag)
            , regionMatch       = subtag.selectors.region().exec(langTag)
            , variantSelector   = subtag.selectors.variant()
            , variantMatch      = variantSelector.exec(langTag)
            , extensionSelector = subtag.selectors.extension()
            , extensionMatch    = extensionSelector.exec(langTag)
            , privateuseMatch   = subtag.selectors.privateuse().exec(langTag)
			;

			if(languageMatch.length > 1) {
				result.language = languageMatch[1];
			}
			if(scriptMatch.length > 1) {
				result.script = scriptMatch[1];
			}
			if(regionMatch.length > 1) {
				result.region = regionMatch[1];
			}
			while(variantMatch.length > 1) {
				if(variantMatch.length > 1) {
					result.variants += variantMatch.slice(1,1);
				}
				variantMatch = variantSelector.exec(langTag);
			}
			while(extensionMatch.length > 1) {
				if(extensionMatch.length > 1) {
					result.extensions += extensionMatch.slice(1,1);
				}
				extensionMatch = extensionSelector.exec(langTag);
			}
			if(privateuseMatch.length > 1) {
				result.privateuse = privateuseMatch[1];
			}

			return result;
		}}
	}
})

module.exports = LanguageTag;