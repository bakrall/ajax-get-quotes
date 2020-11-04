//https://pprathameshmore.github.io/QuoteGarden/

(function() {
	'use strict';

	const url = 'https://gist.githubusercontent.com/bakrall/8c4987127e2f093c93415e29b2a01564/raw/8f24e6e5a03554ef6341365b734d0f39b961edbf/quotes.json',
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

	//cache fetched quotes to make their display quicker
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

	function changeQuote(timing, changeImg) {
		populateText(quoteText, quoteAuthor, timing);
		storeQuote();

		if (changeImg) changeImage();
	}

	function displayQuote() {
		if (alreadyRunning) return;

		alreadyRunning = true;

		if (localStorage.getItem('quotes')) {
			const cachedQuotes = JSON.parse(localStorage.getItem('quotes')),
				id = Math.floor(Math.random() * 6);

			quoteText = htmlEncode(cachedQuotes[id].text),
			quoteAuthor = htmlEncode(cachedQuotes[id].author);

			changeQuote(1500, true);
		} else {
			const request = getQuote();

			request
				.done(() => {
					changeQuote(0, false);
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

	function init() {
		//clear storage on page load in case new quotes are added
		localStorage.clear();
		displayQuote();
	}
 
	init();
})();
