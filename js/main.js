window.onload = function(){

	//initialize portfolio
	var myApp = new portfolio_app('developer');
	myApp.initialize();

}

/* Main Portfolio App  ---------------------------------------------------------------------------------*/
var portfolio_app = function(mode){

	var current_work_index;

	//INITIALIZE PORTFOLIO APP
	function initialize(){

		//sets all needed components, listeners, etc
		setScrollListeners();
		setSmoothScrolling();
		setMobileMenuListener();
		setWorkListeners();
	}

	/*----------------------------------------------------------------------
	// fomartBodyPages: sets basic structure for all body pages
	/---------------------------------------------------------------------*/
	function setScrollListeners(){
		//when scrolling off about
		var distance = $('.body-main-header').height();
		$(window).scroll(function(){
		    if( $(window).scrollTop() >= distance ){
		        $('.body-main-header').addClass('scrolled');
		    }
		    else{
		    	$('.body-main-header').removeClass('scrolled');
		    }
		})

		var done = false;
		//when scroll to work section
		$(window).scroll(function(){
		    if( $(window).scrollTop() >= $('#work').offset().top - 100){
		    	if(!done){
			    	//window.location.hash ='work';
			        $('.work-piece').each(function(i){
			        	$(this).delay(100*i).fadeIn(180);
			        })
			        done = true;
		    	}
		    }
		})

	}

	function setSmoothScrolling() {
		$('.nav-links li a, .nav-logo, .more-link').click(function() {
		      var target = $(this.hash);
		      console.log(target);
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 500);
		        return false;
		      }
		  
		});
	}

	function setMobileMenuListener(){
		$('.mobile-header-container .menu-btn').click(function(){
			var toggle = $(this).data('toggle')||0
			switch(toggle){
				case 0:
					$(this).addClass('clicked');
					$('.mobile-header-container .nav-links').removeClass('closed');
					$('.mobile-header-container .nav-links').show();
					break;
				case 1:
					$(this).removeClass('clicked');
					$('.mobile-header-container .nav-links').addClass('closed');
					$('.mobile-header-container .nav-links').delay(100).fadeOut(100);
					break;
			}
			toggle ++;
			if(toggle > 1) toggle = 0;
			$(this).data('toggle', toggle);
		});

		//close mobile nav when a link is clicked
		$('.mobile-header-container .nav-links li a').click(function(){
			$('.mobile-header-container .menu-btn').data('toggle',0);
			$('.mobile-header-container .menu-btn').removeClass('clicked');
			$('.mobile-header-container .nav-links').addClass('closed');
			$('.mobile-header-container .nav-links').delay(100).fadeOut(100);
		})

	}

	function setWorkListeners(){
		$('.work-piece').click(function(e){
			changeWorkView('showcase');
			var id = "item-" + $(this).attr('id');
			getIndexOfWork(id);
			$(document.getElementById(id)).addClass('current');
			$(document.getElementById(id)).fadeIn(200);
		});

		//back to gallery
		$('.gallery-btn').click(function(e){
			changeWorkView('gallery');
			$('.work-piece').each(function(i){
	        	$(this).delay(100*i).fadeIn(180);
	        })
		})


		$('.arrow').click(function(){
			switchShownWork( $(this).attr('id') );
		})
	}

	function changeWorkView(mode){
		if(mode == "showcase"){
			var works = $('#work').find('.work-piece');
			var delay = 1;
			for(var i=works.length; i>=0; i--){
				$(works[i-1]).delay(50*delay).fadeOut(300);
				delay ++;
			}

	        $('#work-gallery').delay(700).fadeOut(200);
	        $('#work-showcase').delay(800).fadeIn(200);
    	}
    	else if ('gallery'){
    		$('.current').removeClass('current');
    		$('#work-showcase').fadeOut(200);
	        $('#work-gallery').delay(200).fadeIn(200);
    	}
	}

	function switchShownWork(direction){
		var items = $('#work-showcase').find('.showcase-item');

		if(direction == "left"){
			$('.current').css('margin-left', '230%');
			if(current_work_index!=0)
				current_work_index -= 1;
			else
				current_work_index = items.length - 1;

			$(items[current_work_index]).css('margin-left','-230%');
		}
		else if (direction == "right"){
			$('.current').css('margin-left', '-230%');
			if(current_work_index != items.length -1)
				current_work_index += 1;
			else
				current_work_index = 0;

			$(items[current_work_index]).css('margin-left','230%');
		}

		setTimeout(function(){
			$('.current').removeClass('current');
			$(items[current_work_index]).addClass('current');
			$(items[current_work_index]).delay(600).css('margin-left', 0);
		}, 300);
	}

	function getIndexOfWork(id){
		$('.showcase-item').each(function(i){
			if ($(this).attr('id') == id)
				current_work_index = i;
		})
	}

	return{
		initialize: initialize,
	}

};