(function ($) {
"use strict";

// meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "992"
});

// One Page Nav
var top_offset = $('.header-area').height() - 10;
$('.main-menu nav ul').onePageNav({
	currentClass: 'active',
	scrollOffset: top_offset,
});


$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".header-sticky").removeClass("sticky");
	} else {
		$(".header-sticky").addClass("sticky");
	}
});


//////////////////////////////////
/////////////////////




// const slider = document.querySelector('.team-slider-wrapper');
// const teamMembers = document.querySelectorAll('.team-member');
// let slideWidth = teamMembers[0].offsetWidth;
// let currentIndex = 0;

// function slide(direction) {
// 	if (direction === 'prev') {
// 		currentIndex--;
// 	} else if (direction === 'next') {
// 		currentIndex++;
// 	}
	
// 	if (currentIndex < 0) {
// 		currentIndex = teamMembers.length - 1;
// 	} else if (currentIndex >= teamMembers.length) {
// 		currentIndex = 0;
// 	}
	
// 	const slidePosition = -currentIndex * slideWidth;
// 	slider.style.transform = `translateX(${slidePosition}px)`;
// }

// document.querySelector('.prev').addEventListener('click', () => slide('prev'));
// document.querySelector('.next').addEventListener('click', () => slide('next'));

const carouselContainer = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const teamMembers = document.querySelectorAll('.team-member');
const teamMemberWidth = teamMembers[0].offsetWidth;
const visibleItems = 4;
let currentPosition = 0;

prevButton.addEventListener('click', () => {
  currentPosition += teamMemberWidth;
  if (currentPosition > 0) {
    currentPosition = -(teamMemberWidth * (teamMembers.length - visibleItems));
  }
  carouselContainer.style.transform = `translateX(${currentPosition}px)`;
});

nextButton.addEventListener('click', () => {
  currentPosition -= teamMemberWidth;
  if (currentPosition < -(teamMemberWidth * (teamMembers.length - visibleItems))) {
    currentPosition = 0;
  }
  carouselContainer.style.transform = `translateX(${currentPosition}px)`;
});



// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();


// owlCarousel
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:0,
	items:1,
	navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    nav:true,
	dots:true,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:3
        },
        992:{
            items:4
        }
    }
})



/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


// isotop
$('.grid').imagesLoaded( function() {
	// init Isotope
	var $grid = $('.grid').isotope({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  masonry: {
		// use outer width of grid-sizer for columnWidth
		columnWidth: '.grid-item',
	  }
	});
});

// filter items on button click
$('.portfolio-menu').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

//for menu active class
$('.portfolio-menu button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});




// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp', // Element ID
	topDistance: '300', // Distance from top before showing element (px)
	topSpeed: 300, // Speed back to top (ms)
	animation: 'fade', // Fade, slide, none
	animationInSpeed: 200, // Animation in speed (ms)
	animationOutSpeed: 200, // Animation out speed (ms)
	scrollText: '<i class="icofont icofont-long-arrow-up"></i>', // Text for element
	activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});

// WOW active
new WOW().init();


})(jQuery);