"use strict";

var expect = require('expect.js')
, subtag = require('../lib/languagesubtag')
;

describe('subtag', function () {

	it('is an object', function () {
		expect(subtag).to.be.an(Object);
	});
});