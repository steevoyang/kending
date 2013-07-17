$(document).ready(function() {
 	var navbar = $('.nav-bar');
 	var minHeight; // minHeight is also the offset for the navbar

 	// fixes nav bar when reaches top of window
 	$(window).scroll(function () {
 		var navbarScrolltop = $(this).scrollTop();
 		if (navbarScrolltop >= minHeight) {
 			navbar.css({'position': 'fixed', 'top': 0});
 		}
 		else {
 			navbar.css({'position': '', 'top': ''});	
 		}
	});
	
	// smooth scrolls to each section
	$('.nav-items li').click(function () {
		var sectionName = $(this).attr('section');
		var sectionElement = $('.'+sectionName);
		var sectionOffset = sectionElement.offset().top;
		$('html, body').animate({scrollTop: sectionOffset}, 'slow');
	});


	// Cache selectors
	var lastId;
	var navItems = $(".nav-items");
	var navItemsHeight = navItems.outerHeight()+15;
	var menuItems = navItems.find("a"); // All list items
	    // Sections corresponding to menu items
	    scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
	    });

	// Bind to scroll
	$(window).scroll(function(){
		// Get container scroll position
		var fromTop = $(this).scrollTop()+navItemsHeight;
   
	// Get id of current scroll item
	var cur = scrollItems.map(function(){
		if ($(this).offset().top < fromTop)
		return this;
	});

	// Get the id of the current element
	cur = cur[cur.length-1];
	var id = cur && cur.length ? cur[0].id : "";
   
	   if (lastId !== id) {
	       lastId = id;
	       // Set/remove active class
	       menuItems
	         .parent().removeClass("active")
	         .end().filter("[href=#"+id+"]").parent().addClass("active");
	   }
	});    


	// calculates resizing window and sets site header site to that
	function onResize() {
		minHeight = $(window).height();
		$('.site-header').css('min-height', minHeight + 'px');
	}

	onResize();
	$(window).bind('resize', onResize);

	// Settign variables for video
	var video = $(".intro-video");
    var html  = $("html");

	// 1. Explicitly remove src value, so if user presses back
    //    button, the video will not start playing on page load
    // 2. Set the height of the video
    video.attr("src", "").height($(".intro-video").height());

    // Show and play the video
    $(".play-button").on("click", function(e) {
		console.log('click');
		e.preventDefault();
		html.addClass("video-is-visible");
		video.attr('src', 'http://player.vimeo.com/video/70332615?autoplay=1&amp;player_id=vimeoplayer&amp;api=1');
		$('.intro-video').css('min-height', minHeight);
		$('html').append('<style type="text/css">.site-header:hover button{opacity: 1;}</style>');
		// $('.site-header:hover button').css('opacity', 1);
		// $('.close-video').css('opacity', 1);
    });

    // Hide the video
    $(".close-video").on("click", function(e) {
	    e.preventDefault();
	    html.removeClass("video-is-visible");
	    video.attr("src", "");
	    $('.close-video').css('opacity', 0);
    });
});