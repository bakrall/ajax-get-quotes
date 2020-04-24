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
			"'" : "&#39;", //it may appear in quote, for example "you'll", "you're"
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
			populateText(quoteText, quoteAuthor);
			storeQuote();
		})
	}

	function populateText(text = '', author = '') {
		$quote.text(text);
		$quoteAuthor.text(author);
	}

	function storeQuote() {
		localStorage.setItem('quoteStored', quoteText);
		localStorage.setItem('quoteAuthorStored', quoteAuthor);
	}

	function displayStoredQuote() {
		const quoteStored = localStorage.getItem('quoteStored'),
			quoteAuthorStored = localStorage.getItem('quoteAuthorStored'),
			notUndefined = quoteStored !== 'undefined' && quoteAuthorStored !== 'undefined',
			notNull = quoteStored !== null && quoteAuthorStored !== null;

		if (notUndefined && notNull) {
			populateText(quoteStored, quoteAuthorStored);
		} else {
			displayQuote();
		}
	}
 
	displayStoredQuote();
	$getQuoteButton.on('click', displayQuote);
})();