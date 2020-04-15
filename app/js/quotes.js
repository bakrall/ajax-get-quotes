//https://pprathameshmore.github.io/QuoteGarden/

(function() {
	'use strict';

	const url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random',
		$quote = $('.quote'),
		$quoteAuthor = $('.quote-author'),
		$getQuoteButton = $('.get-quote-button');

	let quoteText, quoteAuthor;

	function htmlEncode(s) {
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

	function getQuote() {
		return $.ajax({
					type: 'GET',
					url: url,
					success: function(response) {
						quoteText = htmlEncode(response.quote.quoteText),
						quoteAuthor = htmlEncode(response.quote.quoteAuthor);
					},
					error: function(error) {
						console.log(error);
					}
				});
	}

	function displayQuote() {
		const request = getQuote();

		request.done(() => {
			$quote.text(quoteText);
			$quoteAuthor.text(quoteAuthor);
		})
	}

	displayQuote();
	$getQuoteButton.on('click', displayQuote);
})();