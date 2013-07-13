$(document).ready(function() {
 	var navbar = $('.nav-bar');
 	var navbarOffset = navbar.offset().top;
 	$(window).scroll(function () {
 		var navbarScrolltop = $(this).scrollTop();
 		if (navbarScrolltop >= navbarOffset) {
 			navbar.css({'position': 'fixed', 'top': 0});
 		}
 		else {
 			navbar.css({'position': '', 'top': ''});	
 		}
	});
	$('.nav-items li').click(function () {
		var sectionName = $(this).attr("section");
		var sectionElement = $('.'+sectionName);
		var sectionOffset = sectionElement.offset().top;
		$("html, body").animate({scrollTop: sectionOffset});
	});
});