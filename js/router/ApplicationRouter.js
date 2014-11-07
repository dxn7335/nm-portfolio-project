/*---------------------------------------------------------------*/
/*
*   Portfolio Template Project
`   By, Danny Nguyen
    ==============================

    Application Router:
        The Backbone router that tracks the url manipulation
        and loads page content based on history change
*/
/*---------------------------------------------------------------*/


var ApplicationRouter = Backbone.Router.extend({
	
	initialize: function(el, pRoutes) {
		this.el = el;
        this.loadWorkInfo();
	},
    
    routeId: null,
	currentView: null,
	pastView: null,
	loadedWorks: null,
    
	routes: {
		"": "changeView",
        ":id" : "changeView",
        "work": "setWorkPreview",
        ":type/:id" : "changeWorkView",
		"*else": "notFound", 
	},
	
	switchView: function(view) {
        var previous = this.currentView;
		if (previous) {
			// Detach the old view
            previous.transitionOut(function(){
                previous.remove();
            })
		  	
		  	//add past view
		  	this.pastView = previous;
            // Move the view element into the DOM (replacing the old content)
		    this.el.prepend(view.el);
        }
        else{
            //if no previous view existed, totally replace contents in dom
            this.el.html(view.el);
        }

		// Render view after it is in the DOM (styles are applied)
		view.render();
        this.afterViewLoaded();
		this.currentView = view;
        //if on a work case study page, will call updateWorkNav 
        var callback = (this.routeId.indexOf("work/") != -1) ? this.updateWorkNav() : null;
        this.currentView.transitionIn(callback);
        $('.loading-screen').fadeOut(400);
	},
    
	/*-----------------------------------------------------
	 * Change the active content 
	 ----------------------------------------------------*/
	changeView: function(id, type){
        if(!id) {
            id = 'home';
        }
        
        this.loadPageContent(id);
        this.setActiveEntry(id);
	},
    
    /*-----------------------------------------------------
	 * Change the work related content 
	 ----------------------------------------------------*/
    changeWorkView: function(type,id){

        var pageID = type+"/"+id;
        
        console.log(type);
        this.loadPageContent(pageID);
    },
    
    setActiveEntry: function(url) {
		// Unmark all entries
        $('.nav-link-active').removeClass('nav-link-active');

		// Mark active entry
        if( url.indexOf("work") != -1)
            $(".nav-links li a[href='#/work']").parent().addClass('nav-link-active');
        else
		  $(".nav-links li a[href='#/" + url + "']").parent().addClass('nav-link-active');
	},
    
    
    /*------------------------------------------------------
     * Loads Page Content Through AJAX Request
     -----------------------------------------------------*/
    loadPageContent: function(id){
        $('.loading-screen').fadeIn(300);
        NProgress.start();
        
        // Make a reference to router itself
        // Fuck this. no like seriously, fuck this
        var router = this;
        
        $.ajax({
            url:'template/' + id + '.html',
            dataType: 'text',
            cache: true,
            success: function(data){
                //check if work information has been loaded (important for all pages)  
                router.routeId = id;
                //router.checkWorkLoaded();
                router.addedView = new TemplatedView({template:data, data:{}, routeId:id});
                router.switchView(router.addedView);
                router.setActiveEntry(id);
                NProgress.done();
            },
            error: function(){ // [TODO] eeewwww this code is not DRY
                router.notFound();
            },
            progress: function(){
                NProgress.inc();
            },
        });
    },
    
    
    /* WORK RELATED ------------------------------------------------------*/
    afterViewLoaded: function(){
        if(!this.loadedWorks){ this.loadWorkInfo(); }
        else{
            if(this.routeId == "work") {
                this.setWorkPreviewItems();
            }
            else if(this.routeId.indexOf("work/") != -1) {
                this.updateCurrentProjectId(this.routeId);
            }
            else if(this.routeId == "contact" || this.routeId == "about"){
                this.fillExploreSection();
            }
        }
    },
    
    /*----------------------------------------------------------------------
    * loadWorkInfo: loads needed work information from work.json
    *---------------------------------------------------------------------*/
    loadWorkInfo: function(){
        NProgress.start();
        //individual case study will come in
        var router = this;
        
        $.ajax({
            url: "js/configure/work.json",
            type: "GET",
            contentType: "application/json",
            cache: true,
            success: function(data){
                router.loadedWorks = data.works.work;
             
                /* WHEN Work Information has been stored 
                //check if on Work Page
                //if so, will load items on page after work information has loaded
                if(router.routeId == "work") router.setWorkPreviewItems();
                //else if on case studies page then get current id of work
                else if(router.routeId.indexOf("work/") != -1) router.updateCurrentProjectId(router.routeId);
                else if(router.routeId == "contact" || router.routeId == "about") router.fillExploreSection();
                */
                NProgress.done();
                $('.loading-screen').fadeOut(400);
            },
            error: function(error, thrownError){ // [TODO] eeewwww this code is not DRY
                console.log(thrownError);
            },
            progress: function(){
                NProgress.inc();
            },
        });
    },
    
    /*----------------------------------------------------------------------
    * setWorkPreview: 
    *---------------------------------------------------------------------*/
    setWorkPreviewItems: function(){
        //On general work page
        //Will load all prieviews and breif information
        for(var i=0; i<this.loadedWorks.length; i++){
            var item = new WorkPrevView({template: "#work-gallery-item", data: this.loadedWorks[i], routeId: "work-gallery-item"});
        }
    },
    
    /*----------------------------------------------------------------------
    * updateCurrentProjectId:
    *---------------------------------------------------------------------*/
    updateCurrentProjectId: function(id){
       id = id.split("work/")[1];
       for(var i=0; i<this.loadedWorks.length; i++){
            if(id == this.loadedWorks[i].id){ this.currentWork = i; }
        }
    },
    
    /*----------------------------------------------------------------------
    * updateWorkNav: updates id of prev and next links on work nav
    *---------------------------------------------------------------------*/
    updateWorkNav: function(){
        var left, right, text;
        var i = this.currentWork;
        
        //Setting up links
        //PREV
        if(i > 0){
            text = "< P R E V";
            left = "<a class='work-nav-btn prev' href='#/work/"+this.loadedWorks[i-1].id+"'>"+text+"</a>";
        }
        else{ left = "<a class='work-nav-btn prev fill'></a>"; }
        
        //NEXT
        if(i < this.loadedWorks.length-1){
            text = "N E X T >";
            right = "<a class='work-nav-btn next' href='#/work/"+this.loadedWorks[i+1].id+"'>"+text+"</a>";
        }
        else{ right = "<a class='work-nav-btn next fill'></a>"; }
        
        //To Gallery button
        var gallery = "<a class='work-nav-btn gallery' href='#/work'>"+"<i class='fa fa-th-list fa-2x'></i>"+"</a>";
        
        var nav = "<div class='work-nav'>"+left+gallery+right+"</div>";
        $(nav).insertBefore('footer');
    },
    
    
    /*----------------------------------------------------------------------
    * fillExploreSection: fills content for bottom work prev link
    *                     - for About, Contact pages
    *---------------------------------------------------------------------*/
    fillExploreSection: function(){
        var i = Math.floor(Math.random() * (this.loadedWorks.length));
        $('#workprev').attr('href', "#/work/"+this.loadedWorks[i].id);
        $('#workprev').css('background', "url('"+this.loadedWorks[i].img+"') no-repeat");
        $('#workprev').css('background-size', "100%");
        $('#workprev').find('.work-desc').html(this.loadedWorks[i].description);
    },
    
    /*-----------------------------------------------------------------------
    * notFound: if page not found.
    *----------------------------------------------------------------------*/
    notFound: function() {
        NProgress.done();
        $(window).scrollTop(0);
        $('.loading-screen').fadeOut(400);
		this.addedView = new ContentView({template:"#404"});
		this.switchView(this.addedView);
	},
});
