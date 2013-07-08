"use strict";

var expect = require('expect.js')
, subtag = require('../lib/languagesubtag')
;

describe('LanguageSubTag', function () {

	it('is an object', function () {
		expect(subtag).to.be.an(Object);
	});

	it('has a `kinds` property', function () {
		expect(subtag).to.have.property('kinds');
	});

	describe('property `kinds`', function () {
		
		it('has a `language` property', function () {
			expect(subtag.kinds).to.have.property('language');
		});

		it('`language` property equals `language`', function () {
			expect(subtag.kinds.language).to.eql('language');	
		});

		it('has a `script` property', function () {
			expect(subtag.kinds).to.have.property('script');
		});

		it('`script` property equals `script`', function () {
			expect(subtag.kinds.script).to.eql('script');	
		});

		it('has a `region` property', function () {
			expect(subtag.kinds).to.have.property('region');
		});

		it('`region` property equals `region`', function () {
			expect(subtag.kinds.region).to.eql('region');	
		});

		it('has a `variant` property', function () {
			expect(subtag.kinds).to.have.property('variant');
		});

		it('`variant` property equals `variant`', function () {
			expect(subtag.kinds.variant).to.eql('variant');	
		});

		it('has a `extension` property', function () {
			expect(subtag.kinds).to.have.property('extension');
		});

		it('`extension` property equals `extension`', function () {
			expect(subtag.kinds.extension).to.eql('extension');	
		});

		it('has a `privateUse` property', function () {
			expect(subtag.kinds).to.have.property('privateUse');
		});

		it('`privateUse` property equals `privateUse`', function () {
			expect(subtag.kinds.privateUse).to.eql('privateUse');	
		});
	});

	it('has a `validateLanguage` property', function () {
		expect(subtag).to.have.property('validateLanguage');
	});

	describe('`validateLanguage` property', function () {
		
		it('is a `function`', function () {
			expect(subtag.validateLanguage).to.be.a(Function);
		});

		it('will validate `en`', function () {
			expect(subtag.validateLanguage('en')).to.be(true);
		});

		it('will validate `lra`', function () {
			expect(subtag.validateLanguage('lra')).to.be(true);
		});

		it('will not validate `666`', function () {
			expect(subtag.validateLanguage('666')).to.be(false);
		});
	});

	describe('`validateScript` property', function () {
		
		it('is a `function`', function () {
			expect(subtag.validateScript).to.be.a(Function);
		});

		it('will validate `Afak`', function () {
			expect(subtag.validateScript('Afak')).to.be(true);
		});

		it('will not validate `abc`', function () {
			expect(subtag.validateScript('abc')).to.be(false);
		});
	});

	describe('`validateRegion` property', function () {
		
		it('is a `function`', function () {
			expect(subtag.validateRegion).to.be.a(Function);
		});

		it('will validate `US`', function () {
			expect(subtag.validateRegion('US')).to.be(true);
		});

		it('will validate `123`', function () {
			expect(subtag.validateRegion('123')).to.be(true);
		});

		it('will not validate `abc`', function () {
			expect(subtag.validateRegion('abc')).to.be(false);
		});
	});

	describe('`validateVariant` property', function () {
		
		it('is a `function`', function () {
			expect(subtag.validateVariant).to.be.a(Function);
		});

		it('will validate `abc123`', function () {
			expect(subtag.validateVariant('abc123')).to.be(true);
		});

		it('will validate `1abc`', function () {
			expect(subtag.validateVariant('1abc')).to.be(true);
		});

		it('will not validate `abc`', function () {
			expect(subtag.validateVariant('abc')).to.be(false);
		});
	});

	describe('`validateExtension` property', function () {
		
		it('is a `function`', function () {
			expect(subtag.validateExtension).to.be.a(Function);
		});

		it('will validate `a-bc`', function () {
			expect(subtag.validateExtension('a-bc')).to.be(true);
		});

		it('will validate `d-12345678`', function () {
			expect(subtag.validateExtension('d-12345678')).to.be(true);
		});

		it('will not validate `x-abc`', function () {
			expect(subtag.validateExtension('x-abc')).to.be(false);
		});
	});

	describe('`validatePrivateUse` property', function () {
		
		it('is a `function`', function () {
			expect(subtag.validatePrivateUse).to.be.a(Function);
		});

		it('will validate `x-b-c`', function () {
			expect(subtag.validatePrivateUse('x-b-c')).to.be(true);
		});

		it('will validate `x-12345678`', function () {
			expect(subtag.validatePrivateUse('x-12345678')).to.be(true);
		});

		it('will not validate `e-abc`', function () {
			expect(subtag.validatePrivateUse('e-abc')).to.be(false);
		});
	});
	
});