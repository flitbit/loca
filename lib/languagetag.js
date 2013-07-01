"use strict";

var extend = require('extend')
, dbc = require('dbc.js')
;

var defaults = {
	language: 'en'
	, script: undefined
	, region: undefined
	, variants: undefined
	, extensions: undefined
	, privateuse: undefined
}
, validators = {
	language: /[A-Za-z]{2,3}/
	, script: /[A-Za-z]{4}/
	, region: /[A-Za-z]{2}|[0-9]{3}/
	, variant: /[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}/
	, extension: /[A-Za-z0-9](?:-[A-Za-z0-9]{2,8})+/
	, privateuse: /[xX](?:-[A-Za-z0-9]{1,8})+/
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

			var parts = langTag.split('-');
			if(parts)
			{

			}
		}}
	}
})

module.exports = LanguageTag;