$(document).ready(function() {
 	var navbar = $('.nav-bar');
 	var navbarOffset = navbar.offset().top;
 	var minHeight = $(window).height() + 'px';

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
		var sectionName = $(this).attr('section');
		var sectionElement = $('.'+sectionName);
		var sectionOffset = sectionElement.offset().top;
		$('html, body').animate({scrollTop: sectionOffset});
	});

	function windowHeight() {
		$('.site-header').css('min-height', minHeight);
	}

	windowHeight();
	$(window).bind('resize', windowHeight);


	// AnyStretch on Homepage background image
	$(".site-header").anystretch("http://f.cl.ly/items/2N1W1F0F2P3T0i2c2k1n/Untitled-1.png");


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
		video.attr('src', 'http://player.vimeo.com/video/69515828?autoplay=1&amp;player_id=vimeoplayer&amp;api=1');
		$('.intro-video').css('min-height', minHeight);
    });

    // Hide the video
    $(".close-video").on("click", function(e) {
	    e.preventDefault();
	    html.removeClass("video-is-visible");
	    video.attr("src", "");
    });

	// Newsletter Signup
	$('#newsletter-signup').submit(function() {

		//setup variables
		var form = $(this),
		formData = form.serialize(),
		formUrl = form.attr('action'),
		formMethod = form.attr('method'),
		responseMsg = $('#signup-response')

		//show response message - waiting
		responseMsg.hide()  
           .addClass('response-waiting')  
           .text('Please Wait...')  
           .fadeIn(200);  

    	//send data to server
    	$.ajax({
    		url: formUrl,
    		type: formMethod,
    		data: formData,
    		success:function(data){
    			
    			//setup variables
    			var responseData = jQuery.parseJSON(data),
    				klass = '';

    			//response conditional
    			switch(responseData.status){
    				case 'error':
    					klass = 'response-error';
    				break;
    				case 'success':
    					klass ='response-success';
    				break;
    			}

    			//show response message
    			responseMsg.fadeOut(200,function(){  
				    $(this).removeClass('response-waiting')  
				           .addClass(klass)  
				           .text(responseData.message)  
				           .fadeIn(200,function(){  
				               //set timeout to hide response message  
				               setTimeout(function(){  
				                   responseMsg.fadeOut(200,function(){  
				                       $(this).removeClass(klass);  
				                   });  
				               },3000)  
				            })  
				})  
    		}
    	})

		//prevent form from submitting
		return false;
	});
});