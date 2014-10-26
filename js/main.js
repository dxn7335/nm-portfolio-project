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
    
    /**********************************************************************/
	/*----------------------------------------------------------------------
	// initRouter: instantiates and starts backbone router
	/---------------------------------------------------------------------*/
    /**********************************************************************/
	function initRouter (){
		this.router = new ApplicationRouter($('#body-container'), routeConfig);
		Backbone.history.start();
	}

	/*----------------------------------------------------------------------
	// setScrollListeners: scroll event handlers
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

		
		//Only show nav bar when scrolling up
		var lastScroll = 0;
		$(window).scroll(function(){
            if( $(window).scrollTop() >= distance+20 ){
                if($(window).scrollTop() > lastScroll) { $('.body-main-header').addClass('scrolled-down'); }
                else { $('.body-main-header').removeClass('scrolled-down'); }

                lastScroll = $(window).scrollTop();
            }
		}) 

	}
    
    /*----------------------------------------------------------------------
	// setSmoothScrolling: Smooth scrolling for navigational links
	/---------------------------------------------------------------------*/
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
        router: portfolio_app.router,
	}

};