//https://pprathameshmore.github.io/QuoteGarden/

(function() {
	'use strict';

	const requestUrl = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';

	function HtmlEncode(s) {
		var HTMLCharMap = {
			"&" : "&amp;",
			"'" : "&#39;",
			'"' : "&quot;",
			"<" : "&lt;",
			">" : "&gt;",
			"\\" : "&#x5c;",
			"`" : "&#x60;",
			":" : "&#58;"
		};

		function encodeHTMLmapper(ch) {
		return HTMLCharMap[ch];
		}

		return s.replace(/[&'''<>\\`:]/g, encodeHTMLmapper);
	}

	$.ajax({
		type: 'GET',
		url: requestUrl,
		success: function(response) {
			console.log(HtmlEncode(response.quote.quoteText));
		},
		error: function(error) {
			console.log(error);
		}
	});
})();