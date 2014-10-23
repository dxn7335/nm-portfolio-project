var ApplicationRouter = Backbone.Router.extend({
	
	initialize: function(el, pRoutes) {
		this.el = el;
	},

	currentView: null,
	pastView: null,
	
	routes: {
		"": "changeView",
        ":id" : "changeView",
        ":type/:id" : "changeView",
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
		this.currentView = view;
        this.currentView.transitionIn();
        
	},
    
	/*
	 * Change the active element in the topbar
	 */
	changeView: function(id, type){
        if(!id) {
            id = 'home';
        }
        if(id == "work" || type == "work"){
            if(!loadedWorks){ setupWork();}
        }
        //if type is not null
        if(type){
            id = type+"/"+id;
        }
        NProgress.start();
        // Make a reference to router itself
        // Fuck this. no like seriously, fuck this
        var router = this;
        
        $.ajax({
            url:'template/' + id + '.html',
            dataType: 'text',
            cache: true,
            success: function(data){
                router.addedView = new TemplatedView({template:data, data:{}, routeId:id});
                router.switchView(router.addedView);
                router.setActiveEntry(id);
                $('.loading-screen').fadeOut(400);
                NProgress.done();
                $(window).scrollTop(0);
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
    
    setupWork: function(type,id){
        //individual case study will come in
        console.log(type+"/"+id);
    },
    
	setActiveEntry: function(url) {
		// Unmark all entries
        $('.nav-link-active').removeClass('nav-link-active');

		// Mark active entry
		$(".nav-links li a[href='#/" + url + "']").addClass('nav-link-active');
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
