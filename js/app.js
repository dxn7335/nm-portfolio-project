/* Main Portfolio App  ---------------------------------------------------------------------------------*/
var portfolio_app = function(){

	var current_work_index;

	//INITIALIZE PORTFOLIO APP
	function initialize(){

		//sets all needed components, listeners, etc
		setScrollListeners();
		//setSmoothScrolling();
		setMobileMenuListener();
	}
    
    /**********************************************************************/
    // UI LISTENERS:
    /**********************************************************************/
    
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
            else { $('.body-main-header').removeClass('scrolled-down');}
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

    /*----------------------------------------------------------------------
	// setMobileMenuListeners: 
	/---------------------------------------------------------------------*/
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

    //RETURN////
	return{
		initialize: initialize,
	}

}; //End Portfolio App


//On Window Finish Loading
window.onload = function(){
    
	//initialize portfolio
	var myPortfolio = new portfolio_app();
	myPortfolio.initialize();

	//start router
    var AppRouter = new ApplicationRouter($('#body-container'), routeConfig);
    Backbone.history.start();
}