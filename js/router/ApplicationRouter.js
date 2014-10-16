var ApplicationRouter = Backbone.Router.extend({
	
	initialize: function(el, pRoutes) {
		this.el = el;
	},

	currentView: null,
	pastView: null,
	
	routes: {
		"": "changeView",
        ":id" : "changeView",
        "work/:id" : "noHandle",
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
	changeView: function(id){
        if(!id) {
            id = 'home';
        }
        if(id.indexOf("work/") == -1 ){
            //$('.loading-screen').fadeIn(400);
            NProgress.start();
            // Make a reference to router itself
            // Fuck this. no like seriously, fuck this
            var router = this;
            console.log(id);
            
            $.ajax({
                url:'template/' + id + '.html',
                dataType: 'text',
                cache: true,
                success: function(data){
                    router.addedView = new TemplatedView({template:data, data:{}, routeId:id});
                    router.switchView(router.addedView);
                    //router.setActiveEntry(id);
                    $('.loading-screen').fadeOut(400);
                    NProgress.done();
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
            
        }
	},
    
    noHandle: function(id){
        return id;
    },
    
	setActiveEntry: function(url) {
		// Unmark all entries
		$('li').removeClass('active');

		// Mark active entry
		$("li a[href='#" + url + "']").parents('li').addClass('active');
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
