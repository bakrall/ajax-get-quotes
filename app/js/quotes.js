//https://pprathameshmore.github.io/QuoteGarden/

(function() {
	'use strict';

	const url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random',
		$quote = $('.quote'),
		$quoteAuthor = $('.quote-author');

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
		url: url,
		success: function(response) {
			displayQuote(response);
		},
		error: function(error) {
			console.log(error);
		}
	});

	function displayQuote(response) {
		$quote.text(response.quote.quoteText);
		$quoteAuthor.text(response.quote.quoteAuthor);
	}
})();