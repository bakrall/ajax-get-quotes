//https://pprathameshmore.github.io/QuoteGarden/

(function() {
	'use strict';

	const url = 'https://gist.githubusercontent.com/bakrall/8c4987127e2f093c93415e29b2a01564/raw/91f7a495dbc0eb35984d8790710fc9c3524d124b/quotes.json',
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
		},
		quotes = $('.auxiliary').data('json');
	let	quotesCount = 0,
		alreadyRunning = false;

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

	function cacheQuotes(response) {
		localStorage.setItem('quotes', response);
	}

	function getQuote() {
		return $.ajax({
					type: 'GET',
					url: url,
					success: function(response) {
						const data = JSON.parse(response),
							id = Math.floor(Math.random() * 3);

						cacheQuotes(response);

						quoteText = htmlEncode(data[id].text),
						quoteAuthor = htmlEncode(data[id].author);
					},
					error: function(error) {
						console.log(error.statusText);
					}
				});
	}

	function changeQuote() {
		populateText(quoteText, quoteAuthor, 1500);
		changeImage();
		storeQuote();
	}

	function displayQuote() {
		if (alreadyRunning) return;

		alreadyRunning = true;

		if (localStorage.getItem('quotes')) {
			const cachedQuotes = JSON.parse(localStorage.getItem('quotes')),
				id = Math.floor(Math.random() * 6);

			quoteText = htmlEncode(cachedQuotes[id].text),
			quoteAuthor = htmlEncode(cachedQuotes[id].author);

			changeQuote();
		} else {
			const request = getQuote();

			request
				.done(() => {
					changeQuote();
				})
				.fail( error => {
					console.log(error.statusText);
				});
		}
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
			}).fadeIn(timing, () => {
				alreadyRunning = false;
			});
		});
	}

	function storeQuote() {
		localStorage.setItem('quoteStored', quoteText);
		localStorage.setItem('quoteAuthorStored', quoteAuthor);
	}

	function displayStoredQuote() {
		const quoteStored = localStorage.getItem('quoteStored'),
			quoteAuthorStored = localStorage.getItem('quoteAuthorStored');

		if (quoteStored && quoteAuthorStored) {
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
	$(window).on('scroll', function () {
		$('html').css({
			height: $(window).height()
		})
	})
})();