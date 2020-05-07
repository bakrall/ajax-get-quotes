//https://pprathameshmore.github.io/QuoteGarden/

(function() {
	'use strict';

	const url = 'https://gist.github.com/bakrall/8c4987127e2f093c93415e29b2a01564',
		$quote = $('.quote'),
		$quoteAuthor = $('.quote-author'),
		$quoteContainer = $('.quote-container'),
		$getQuoteButton = $('.get-quote-button'),
		$imageContainer = $('.image-container'),
		$creditsLink = $('.credits-link'),
		$photographer = $('.photographer'),
		photographers = {
			'red': 'Annie Spratt',
			'green': 'Nate Johnston'
		};

	let quoteText, quoteAuthor;

	function htmlEncode(s) {
		const HTMLCharMap = {
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

		return s.replace(/[&"'<>\\`:]/g, encodeHTMLmapper);
	}

	function getQuote() {
		return $.ajax({
					type: 'GET',
					url: url,
					success: function(response) {
						const id = Math.floor(Math.random() * 3);

						quoteText = htmlEncode(response[id].text),
						quoteAuthor = htmlEncode(response[id].author);
					},
					error: function(error) {
						console.log(error.statusText);
					}
				});
	}

	function displayQuote() {
		const request = getQuote();

		request
			.done(() => {
				populateText(quoteText, quoteAuthor, 1500);
				changeImage();
				storeQuote();
			})
			.fail( error => {
				console.log(error.statusText);
			});
	}

	function populateText(text = '', author = '', timing = 0) {
		//fadeOut whole quote container
		// $quoteContainer.fadeOut(timing, () => {
		// 		$quote.html(text);
		// 		$quoteAuthor.html(author);
		// }).fadeIn(timing);

		//fade out only text
		$.each([$quote, $quoteAuthor], (i, el) => {
			$(el).fadeOut(timing, () => {
				$quote.html(text);
				$quoteAuthor.html(author);
			}).fadeIn(timing);
		});
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

	function changeImage() {
		$('body').hasClass('red') ? $('body').removeClass('red').addClass('green') : $('body').removeClass('green').addClass('red');

		updatePhotographer();
	}

	function updatePhotographer() {
		const photoCategory = $('body').attr('class'),
			photographer = photographers[photoCategory];

		$creditsLink.fadeOut(2000, () => {
			$photographer.text(photographer);
			$creditsLink.fadeIn(2000);
		})
	}
 
	displayStoredQuote();
	$getQuoteButton.on('click', displayQuote);
})();