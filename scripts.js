$(document).ready(function() {

	// QUOTES CAROUSEL
	$.ajax({
		url: 'https://smileschool-api.hbtn.info/quotes',
		method: 'GET',
		success: function(data) {
			console.log('AJAX success'); // AJAX success
			console.log(data); // (2) [{...}, {...}]
			const quotes = data[0];
			console.log(`Quotes: ${quotes}`); // Quotes: [object Object]
			const carousel = $('#testimonial');
			console.log(`Carousel: ${carousel}`); // Quotes: [object Object]

			// loop through each quote and create a carousel item
			data.forEach(function createCard(quote, index) {
				console.log(quote);
				const item = $('<div>').addClass('carousel-item px-5');
				const helper = $('<div>').addClass('d-flex flex-column align-items-center flex-sm-row col-sm-10 carousel-helper m-md-5');
				const avatar = $('<img>').addClass('rounded-circle carousel-avatar').attr('src', quote['pic_url']).attr('width', '210px');
				console.log(quote['pic_url'])
				const content = $('<div>').addClass('px-sm-5');
				const text = $('<p>').addClass('px-2 mt-4 mt-md-0').text(quote['text']);
				console.log(quote['text']);
				const name = $('<p>').addClass('font-weight-bold pl-2 pt-2 mb-1 align-self-start').text(quote['name']);
				const occupation = $('<cite>').addClass('pl-2 align-self-start').text(quote['title']);

				// add content to carousel item
				content.append(text, name, occupation);
				helper.append(avatar, content);
				item.append(helper);
				carousel.append(item);

				// set first carousel item as active
				if (index === 0) {
					item.addClass('active');
					console.log('active');
				}
			});

			// remove loader and show carousel
			$('#testimonialLoader').remove();
			$('.testimonialCarousel').removeClass('d-none');
		},
		error: function() {
			// handle error
			console.log('Error fetching quotes');
		}
	});

	// TESTIMONIALS CAROUSEL
	$.ajax({
		url: 'https://smileschool-api.hbtn.info/popular-tutorials',
		type: 'GET',
		success: function(data) {
			let cards = '';
			data.forEach((item, index) => {
				cards += `
					<div class="h-100 col-12 col-sm-6 col-md-4">
						<div class="card">
							<img src="${item.thumb_url}" class="card-img-top" alt="${item.title}">
							<div class="card-body">
								<h5 class="card-title">${item.title}</h5>
								<h6>${item['sub-title']}</h6>
								<p>By ${item.author}</p>
								<p>${item.duration}</p>
							</div>
						</div>
					</div>`;
			});
			$('#card-container').append(cards);
			$('.carousel').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			// set the initial height of the cards after they have been added to the page
			setCardHeight();
		}
	});


		// update the height of the cards when the window is resized
		$(window).resize(setCardHeight);

});


	// function to set the height of all cards to match the height of the tallest card
	function setCardHeight() {
		// reset the height of all cards to their initial value
		$('.card').height('auto');

		let maxHeight = 0;
		$('.card').each(function() {
			if ($(this).height() > maxHeight) {
				maxHeight = $(this).height();
			}
		});
		$('.card').height(maxHeight);
	}
