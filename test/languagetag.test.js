"use strict";

var expect = require('expect.js')
, langtag = require('../lib/languagetag')
;

describe('langtag', function () {

	it('is an object', function () {
		expect(langtag).to.be.an(Object);
	});

	describe('property `selectLanguage`', function () {
	
		it('to be a function', function () {
			expect(langtag.selectLanguage).to.be.a(Function);
		});

		describe('when passed `en`', function () {
			var en = langtag.selectLanguage('en');
			it('to return `en` as the match', function () {
				expect(en).to.be('en');
			});
		});

		describe('when passed `en-US`', function () {
			var enUS = langtag.selectLanguage('en-US');
			it('to return `en` as the match', function () {
				expect(enUS).to.be('en');
			});
		});

		describe('when passed `en-usa`', function () {
			var enusa = langtag.selectLanguage('en-usa');
			it('to return `en-usa` as the match', function () {
				expect(enusa).to.be('en-usa');
			});
		});

		describe('when passed `en-usa-US`', function () {
			var enusaUS = langtag.selectLanguage('en-usa-US');
			it('to return `en-usa` as the match', function () {
				expect(enusaUS).to.be('en-usa');
			});
		});

		describe('when passed `zh-Latn-TW-pinyin`', function () {
			var zh = langtag.selectLanguage('zh-Latn-TW-pinyin');
			it('to return `zh` as the match', function () {
				expect(zh).to.be('zh');
			});
		});
	});

	describe('property `selectScript`', function () {
	
		it('to be a function', function () {
			expect(langtag.selectScript).to.be.a(Function);
		});

		describe('when passed `en`', function () {
			var en = langtag.selectScript('en');
			it('to result in `null`', function () {
				expect(en).to.be(null);
			});
		});

		describe('when passed `en-US`', function () {
			var enUS = langtag.selectScript('en-US');
			it('to result in `null`', function () {
				expect(enUS).to.be(null);
			});
		});

		describe('when passed `en-usa`', function () {
			var enusa = langtag.selectScript('en-usa');
			it('to result in `null`', function () {
				expect(enusa).to.be(null);
			});
		});

		describe('when passed `en-usa-US`', function () {
			var enusaUS = langtag.selectScript('en-usa-US');
			it('to result in `null`', function () {
				expect(enusaUS).to.be(null);
			});
		});

		describe('when passed `zh-Latn-TW-pinyin`', function () {
			var zh = langtag.selectScript('zh-Latn-TW-pinyin');
			it('to return `Latn` as the match', function () {
				expect(zh).to.be('Latn');
			});
		});
	});

	describe('property `selectRegion`', function () {
	
		it('to be a function', function () {
			expect(langtag.selectRegion).to.be.a(Function);
		});

		describe('when passed `en`', function () {
			var en = langtag.selectRegion('en');
			it('to result in `null`', function () {
				expect(en).to.be(null);
			});
		});

		describe('when passed `en-US`', function () {
			var enUS = langtag.selectRegion('en-US');
			it('to return `US` as the match', function () {
				expect(enUS).to.be('US');
			});			
		});

		describe('when passed `en-usa`', function () {
			var enusa = langtag.selectRegion('en-usa');
			it('to result in `null`', function () {
				expect(enusa).to.be(null);
			});
		});

		describe('when passed `en-usa-US`', function () {
			var enusaUS = langtag.selectRegion('en-usa-US');
			it('to return `US` as the match', function () {
				expect(enusaUS).to.be('US');
			});	
		});

		describe('when passed `zh-Latn-TW-pinyin`', function () {
			var zh = langtag.selectRegion('zh-Latn-TW-pinyin');
			it('to return `TW` as the match', function () {
				expect(zh).to.be('TW');
			});
		});
	});

	describe('property `selectVariants`', function () {
	
		it('to be a function', function () {
			expect(langtag.selectVariants).to.be.a(Function);
		});

		describe('when passed `en`', function () {
			var en = langtag.selectVariants('en');
			it('to result in `null`', function () {
				expect(en).to.be(null);
			});
		});

		describe('when passed `en-US`', function () {
			var enUS = langtag.selectVariants('en-US');
			it('to result in `null`', function () {
				expect(enUS).to.be(null);
			});
		});

		describe('when passed `en-usa`', function () {
			var enusa = langtag.selectVariants('en-usa');
			it('to result in `null`', function () {
				expect(enusa).to.be(null);
			});
		});

		describe('when passed `en-usa-US`', function () {
			var enusaUS = langtag.selectVariants('en-usa-US');
			it('to result in `null`', function () {
				expect(enusaUS).to.be(null);
			});
		});

		describe('when passed `zh-Latn-TW-pinyin`', function () {
			var zh = langtag.selectVariants('zh-Latn-TW-pinyin');
			it('to return a single matching result', function () {
				expect(zh).to.have.length(1);
			});
			it('to return `pinyin` as the match at index `0`', function () {
				expect(zh[0]).to.be('pinyin');
			});
		});

		describe('when passed `zh-Latn-TW-pinyin-panyan`', function () {
			var zh = langtag.selectVariants('zh-Latn-TW-pinyin-panyan');
			it('to return a result with 2 values', function () {
				expect(zh).to.have.length(2);
			});
			it('to return `pinyin` as the match at index `0`', function () {
				expect(zh[0]).to.be('pinyin');
			});
			it('to return `panyan` as the match at index `1`', function () {
				expect(zh[1]).to.be('panyan');
			});
		});
	});

	describe('property `selectExtensions`', function () {
	
		it('to be a function', function () {
			expect(langtag.selectExtensions).to.be.a(Function);
		});

		describe('when passed `en`', function () {
			var en = langtag.selectExtensions('en');
			it('to result in `null`', function () {
				expect(en).to.be(null);
			});
		});

		describe('when passed `en-US`', function () {
			var enUS = langtag.selectExtensions('en-US');
			it('to result in `null`', function () {
				expect(enUS).to.be(null);
			});
		});

		describe('when passed `en-usa`', function () {
			var enusa = langtag.selectExtensions('en-usa');
			it('to result in `null`', function () {
				expect(enusa).to.be(null);
			});
		});

		describe('when passed `en-usa-US`', function () {
			var enusaUS = langtag.selectExtensions('en-usa-US');
			it('to result in `null`', function () {
				expect(enusaUS).to.be(null);
			});
		});

		describe('when passed `zh-Latn-TW-pinyin`', function () {
			var zh = langtag.selectExtensions('zh-Latn-TW-pinyin');
			it('to result in `null`', function () {
				expect(zh).to.be(null);
			});
		});

		describe('when passed `zh-Latn-TW-pinyin-panyan`', function () {
			var zh = langtag.selectExtensions('zh-Latn-TW-pinyin-panyan');
			it('to result in `null`', function () {
				expect(zh).to.be(null);
			});
		});

		describe('when passed `zh-Latn-TW-pinyin-u-extens`', function () {
			var zh = langtag.selectExtensions('zh-Latn-TW-pinyin-u-extens');
			it('to return a array with 1 value', function () {
				expect(zh).to.have.length(1);
			});
			it('to return `u-extens` as the match at index `0`', function () {
				expect(zh[0]).to.be('u-extens');
			});
		});

		describe('when passed `zh-Latn-TW-pinyin-u-extens-x-private`', function () {
			var zh = langtag.selectExtensions('zh-Latn-TW-pinyin-u-extens-x-private');
			it('to return a array with 1 value', function () {
				expect(zh).to.have.length(1);
			});
			it('to return `u-extens` as the match at index `0`', function () {
				expect(zh[0]).to.be('u-extens');
			});
		});
	});

	describe('property `selectPrivateUse`', function () {
	
		it('to be a function', function () {
			expect(langtag.selectPrivateUse).to.be.a(Function);
		});

		describe('when passed `en`', function () {
			var en = langtag.selectPrivateUse('en');
			it('to result in `null`', function () {
				expect(en).to.be(null);
			});
		});

		describe('when passed `en-US`', function () {
			var enUS = langtag.selectPrivateUse('en-US');
			it('to result in `null`', function () {
				expect(enUS).to.be(null);
			});	
		});

		describe('when passed `en-usa`', function () {
			var enusa = langtag.selectPrivateUse('en-usa');
			it('to result in `null`', function () {
				expect(enusa).to.be(null);
			});
		});

		describe('when passed `en-usa-US`', function () {
			var enusaUS = langtag.selectPrivateUse('en-usa-US');
			it('to result in `null`', function () {
				expect(enusaUS).to.be(null);
			});
		});

		describe('when passed `zh-Latn-TW-pinyin`', function () {
			var zh = langtag.selectPrivateUse('zh-Latn-TW-pinyin');
			it('to result in `null`', function () {
				expect(zh).to.be(null);
			});
		});

		describe('when passed `zh-Latn-TW-pinyin-x-private`', function () {
			var zh = langtag.selectPrivateUse('zh-Latn-TW-pinyin-x-private');
			it('to result in `x-private`', function () {
				expect(zh).to.be('x-private');
			});
		});

		describe('when passed `zh-Latn-TW-pinyin-u-extens-x-private`', function () {
			var zh = langtag.selectPrivateUse('zh-Latn-TW-pinyin-x-private');
			it('to result in `x-private`', function () {
				expect(zh).to.be('x-private');
			});
		});
	});
});