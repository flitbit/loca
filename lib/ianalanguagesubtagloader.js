"use strict";

var dbc = require('dbc.js')
, http = require('http')
, util = require('util')
, subtag = require('./languagesubtag')
, fs = require('fs')
, path = require('path')
;

var _defaultFeed = "http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry"
, _feed = _defaultFeed
, _ianaDocDate
, _ianaDoc
, _subTags
;

function processIANADocument (ianaDoc) {
	function formatPropName (original) {
		var result = ''
		;

		if(original == 'Type') {
			result = 'kind';
		} else if(original == 'Prefix') {
			result = 'prefixes';
		} else {
			var lower = original.toLowerCase()
			, hyphen = lower.indexOf('-')
			;
			if(hyphen > -1) {
				var c = lower[hyphen + 1]
				;
				result = lower.substring(0, hyphen).concat(c.toUpperCase()).concat(lower.slice(hyphen + 2));
			} else {
				result = lower;
			}
		}

		return result;
	}
	
	var parts = ianaDoc.split('%')
	, subtags = []
	;

	parts.forEach(function (e, i, a) {
		if(e) {
			if(i == 0) {
				_ianaDocDate = new Date(e.split(':')[1].trim());
			} else {
				var subParts = e.split('\n')
				, thisTag = { }
				;

				subParts.forEach(function (e, i, a) {
					if(e.indexOf(':') > 0) {
						var lr = e.split(':')
						, l = formatPropName(lr[0])
						, r = lr[1].trim()
						;

						var v = i + 1
						;
						while(v < a.length && a[v][0] == ' ' && a[v].length) {
							r += ' '.concat(a[v].trim());
							v++;
						}
						if(r) {
							if(!(thisTag[l])) {
								if(l === 'prefixes') {
									thisTag[l] = [r];
								} else {
									thisTag[l] = r;
								}
							} else {
								if(Array.isArray(thisTag[l])) {
									thisTag[l].push(r);
								} else {
									thisTag[l] += '; '.concat(r);
								}
							}
						}
					}
				});

				if(thisTag.subtag) {
					try {
						subtags.push(new subtag(thisTag));
					} catch (err) {
						
					}
				}
			}
		}
	});
	_subTags = subtags;
}

function writeLanguageSubTagsToDisk (toLocation) {
	function write () {
		fs.writeFileSync(toLocation, JSON.stringify(_subTags, null, '\t'), 'utf8');
	}
	if(!(_subTags)){
		load(write);
	} else {
		write();
	}
}

function load (callback) {
	fetchIanaDocument(_feed, function (ianaDoc) {
		processIANADocument(ianaDoc);
		if(callback) {
			callback(_subTags);
		}
	});
}

function fetchIanaDocument (from, callback) {
	dbc([from], "A feed URL must be set in order to fetch the language sub tags.")
	http.get(from, function(res) {
		var ianaDoc = '';
		res.on('data', function (chunk){
			ianaDoc += chunk;
		});
		res.on('end',function(){
			_ianaDoc = ianaDoc;
			callback(ianaDoc);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}

Object.defineProperties(module.exports, {
	FeedUrl: {
		value: _feed
		, enumerable: true
		, writable: true
	}
	, Load: {
		value: load
		, enumerable: true
	}
	, WriteLanguageSubTagsToDisk: {
		value: function (toLocation) {
			var to = toLocation || path.join(__dirname, 'iana-org-language-sub-tags.json')
			;
			writeLanguageSubTagsToDisk(to);
		}
		, enumerable: true
	}
	, IanaDoc : {
		get:  function () {
			return _ianaDoc;
		} 
		, enumerable: true
	}
	, IanaDocDate : {
		get:  function () {
			return _ianaDocDate;
		} 
		, enumerable: true
	}
	, SubTags : {
		get:  function () {
			return _subTags;
		} 
		, enumerable: true
	}
});