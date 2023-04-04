$(document).ready(function() {
	generate_quotes();
	generate_popular();
	generate_latest();
});


// QUOTES/TESTIMONIALS CAROUSEL
function generate_quotes() {
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
				const helper = $('<div>').addClass('d-flex flex-column align-items-center flex-sm-row carousel-helper m-md-5');
				const avatar = $('<img>').addClass('rounded-circle carousel-avatar ml-sm-5').attr('src', quote['pic_url']).attr('width', '210px');
				console.log(quote['pic_url'])
				const content = $('<div>').addClass('mx-sm-5');
				const text = $('<p>').addClass('px-2 mt-4 mt-md-0 ').text(quote['text']);
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
			}); /* HΦΣ */

			// remove loader and show carousel
			$('#testimonialLoader').remove();
			$('.testimonialCarousel').removeClass('d-none');
		},
		error: function() {
			// handle error
			console.log('Error fetching quotes');
		}
	});
}

// POPULAR TUTORIALS CAROUSEL
function generate_popular() {
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    type: 'GET',
    success: function(data) {
      let cards = '';
      data.forEach((item, index) => {
        $('#popular-card').append(`
          <div class="h-100 col-12 col-sm-6 col-md-4 card-deck">
            <div class="card border-0 d-flex flex-column">

              <div class="card-img-top">
                <img src="${item.thumb_url}" class="card-img-top" alt="${item.title}">
                <img src="images/play.png" alt="Play Button" class="play-button">
              </div>

              <div class="card-body px-2">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item['sub-title']}</p>
              </div>

              <class='card-footer' style="flex:1;">
                <div class="row">
                  <img src="${item.author_pic_url}" alt="tiny profile" style="height: 20px;" class="ml-4 mr-3 rounded-circle">
                  <h6 class="purple">${item.author}</h6>
                </div>
                <div class="row ml-2 mr-0">
                ${(function stars() {
                  let stars = '';
                  for (let i = 1; i <= 5; i++)
                  {
                    if (i < item.star) {
                      stars += `<img src="./images/star_on.png" height="15px" width="15px">`
                    } else {
                      stars += `<img src="./images/star_off.png" height="15px" width="15px">`
                    }
                  }
                  return stars;
                })
                ()}
                <p class='ml-auto mr-3 purple'>${item.duration}</p>
              </div>
            </div>
          </div>
          `);
      });
      $('#popular-card').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 769,
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

      // remove loader and show carousel
      $('#popular-loader').remove();
      // $('#popular-card').removeClass('d-none');
      resizeCards();
    },
		error: function () {
			console.log('Error fetching popular tutorials');
		}
  });
};

function generate_latest() {
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/latest-videos',
    type: 'GET',
    success: function(data) {
      let cards = '';
      data.forEach((item, index) => {
        $('#latest-card').append(`
          <div class="h-100 col-12 col-sm-6 col-md-4 card-deck">
            <div class="card border-0 d-flex flex-column">

              <div class="card-img-top">
                <img src="${item.thumb_url}" class="card-img-top" alt="${item.title}">
                <img src="images/play.png" alt="Play Button" class="play-button">
              </div>

              <div class="card-body px-2">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item['sub-title']}</p>
              </div>

              <class='card-footer' style="flex:1;">
                <div class="row">
                  <img src="${item.author_pic_url}" alt="tiny profile" style="height: 20px;" class="ml-4 mr-3 rounded-circle">
                  <h6 class="purple">${item.author}</h6>
                </div>
                <div class="row ml-2 mr-0">
                ${(function stars() {
                  let stars = '';
                  for (let i = 1; i <= 5; i++)
                  {
                    if (i < item.star) {
                      stars += `<img src="./images/star_on.png" height="15px" width="15px">`
                    } else {
                      stars += `<img src="./images/star_off.png" height="15px" width="15px">`
                    }
                  }
                  return stars;
                })
                ()}
                <p class='ml-auto mr-3 purple'>${item.duration}</p>
              </div>
            </div>
          </div>
          `);
      });
      $('#latest-card').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 769,
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

      // remove loader and show carousel
      $('#latest-loader').remove();
      // $('#latest-card').removeClass('d-none');
      resizeCards();
    },
		error: function () {
			console.log('Error fetching latest videos');
		}
  });
};

function resizeCards() {
  console.log("resizing...");
  let maxHeight = 0;
  let cardBodies = document.querySelectorAll('.card-body');
  cardBodies.forEach(function(cardBody) {
    cardBody.style.height = 'auto';
    maxHeight = Math.max(maxHeight, cardBody.offsetHeight);
  });
  cardBodies.forEach(function(cardBody) {
    cardBody.style.height = maxHeight + 'px';
  });
}

window.addEventListener('resize', resizeCards);
window.dispatchEvent(new Event('resize'));
