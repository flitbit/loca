"use strict";

var expect = require('expect.js')
, subtag = require('../lib/languagesubtag.js')
;

describe('LanguageSubTag.selectors ', function () {

	describe('when language is called for `en`', function () {
		
		it('returns a single matching result', function () {
			expect(subtag.selectors.language().exec('en')).to.have.length(2);
		});

	});
});