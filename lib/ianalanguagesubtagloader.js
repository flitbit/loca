"use strict";

var http = require('http')
, util = require('util')
, subtag = require('./languagesubtag')
, fs = require('fs')
;

var feed = "http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry"
;

function formatPropName (original) {
	var result = ''
	;

	if(original == 'Type') {
		result = 'kind';
	}
	else {
		var lower = original.toLowerCase()
		, hyphen = lower.indexOf('-')
		;
		if(hyphen > -1) {
			var c = lower[hyphen + 1]
			;
			result =  lower.substring(0, hyphen).concat(c.toUpperCase()).concat(lower.slice(hyphen + 2));
		} else {
			result = lower;
		}
	}

	//console.log('Transforming Property Name `'.concat(original).concat('` to `').concat(result).concat('`'))

	return result;
}

function processIANADocument (ianaDoc) {
	var parts = ianaDoc.split('%')
	, subtags = []
	;

	parts.forEach(function (e, i, a) {
		if(i > 0) {
			var subParts = e.split('\n')
			, thisTag = { }
			;

			subParts.forEach(function (e, i, a) {
				if(e.indexOf(':') > 0) {
					var lr = e.split(':')
					, l = formatPropName(lr[0])
					, r = lr[1].trim()
					;

					if(!(thisTag[l])) {
						thisTag[l] = r;
					} else {
						thisTag[l] += '; '.concat(r);
					}

					var v = i + 1
					;
					while(v < a.length && a[v][0] == ' ' && a[v].length) {
						thisTag[l] += ' '.concat(a[v].trim());
						v++;
					}
				}
			});

			if(thisTag.subtag && !(thisTag.deprecated)) {
				try {
					subtags.push(new subtag(thisTag));
				} catch (err) {
					console.log('Failed to push tag:')
					console.log(util.inspect(thisTag, false, 2, true));
					console.log(util.inspect(err, false, 2, true));
				}
			}
		}
	});

	fs.writeFileSync('./iana-org-language-sub-tags.json', JSON.stringify(subtags, null, '\t'), 'utf8');
}

http.get(feed, function(res) {
	console.log("Got response: " + res.statusCode);

	var ianaDoc = '';

	res.on('data', function (chunk){
		ianaDoc += chunk;
	});

	res.on('end',function(){
		processIANADocument(ianaDoc);
	});
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});