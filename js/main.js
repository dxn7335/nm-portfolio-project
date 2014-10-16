window.onload = function(){

	//initialize portfolio
	var myApp = new portfolio_app('developer');
	myApp.initialize();

	//start router
	myApp.initRouter();
	//var router = new ApplicationRouter($('.body-wrap'), routeConfig);
	//	Backbone.history.start();
    

}

/* Main Portfolio App  ---------------------------------------------------------------------------------*/
var portfolio_app = function(mode){

	var current_work_index;

	//INITIALIZE PORTFOLIO APP
	function initialize(){

		//sets all needed components, listeners, etc
		setScrollListeners();
		//setSmoothScrolling();
		setMobileMenuListener();
	}

	/*----------------------------------------------------------------------
	// initRouter: instantiates and starts backbone router
	/---------------------------------------------------------------------*/
	function initRouter (){
		var router = new ApplicationRouter($('.body-wrap'), routeConfig);
		Backbone.history.start({root:'/'});
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

		/*
		//when scroll to work section
		var done = false;
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
		}) */

	}

	function setSmoothScrolling() {
		$('.nav-links li a, .nav-logo, .more-link').click(function() {
		      var target = $(this.hash);
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


	return{
		initialize: initialize,
		initRouter: initRouter,
	}

};