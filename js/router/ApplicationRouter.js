var ApplicationRouter = Backbone.Router.extend({
	
	initialize: function(el, pRoutes) {
		this.el = el;
	},

	currentView: null,
	pastView: null,
	loadedWorks: null,
    
	routes: {
		"": "changeView",
        ":id" : "changeView",
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
            this.el.prepend(view.el);
        }

		// Render view after it is in the DOM (styles are applied)
		view.render();
		this.currentView = view;
        this.currentView.transitionIn();
        
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
        if(!this.loadedWorks){ this.setupWork();}

        var pageID = type+"/"+id;
        console.log(pageID);
        
        this.loadPageContent(pageID);
        this.setActiveEntry("work");
    },
    
    
    /*------------------------------------------------------
     * Loads Page Content Through AJAX Request
     -----------------------------------------------------*/
    loadPageContent: function(id){
        NProgress.start();
        // Make a reference to router itself
        // Fuck this. no like seriously, fuck this
        var router = this;
        
        $.ajax({
            url:'template/' + id + '.html',
            dataType: 'text',
            cache: true,
            success: function(data){
                //if directed to work page, load the works info if haven't
                if(id == 'work'){        
                    router.checkWorkLoaded();
                }
                router.addedView = new TemplatedView({template:data, data:{}, routeId:id});
                router.switchView(router.addedView);
                router.setActiveEntry(id);
                $(window).scrollTop(0);
                NProgress.done();
                $('.loading-screen').fadeOut(400);
            },
            error: function(){ // [TODO] eeewwww this code is not DRY
                router.addedView = new ContentView({template:"#404"});
                router.switchView(router.addedView);
                $('.loading-screen').fadeOut(400);
                NProgress.done();
            },
            progress: function(){
                NProgress.inc();
            },
        });
    },
    
    /* WORK RELATED */
    checkWorkLoaded: function(){
        if(!this.loadedWorks){ this.loadWorkInfo(); }
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
                console.log(router.loadedWorks);
                router.setWorkPreview();
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
    setWorkPreview: function(){
        console.log( this.el.find('#work-gallery'));
        for(var i=0; i<this.loadedWorks.length; i++){
            var item = new WorkPrevView({template: "#work-gallery-item", data: this.loadedWorks[i], routeId: "work-gallery-item"});
        }
    },
    
	setActiveEntry: function(url) {
		// Unmark all entries
        $('.nav-link-active').removeClass('nav-link-active');

		// Mark active entry
		$(".nav-links li a[href='#/" + url + "']").parent().addClass('nav-link-active');
	},

/*
	at: function() {
		this.switchView(this.atView);
		this.setActiveEntry('#at');
	},

	duis: function() {
		this.switchView(this.duisView);
		this.setActiveEntry('#duis');
	},*/

	notFound: function() {
        NProgress.done();
		this.addedView = new ContentView({template:"#404"});
		this.switchView(this.addedView);
	}

});
