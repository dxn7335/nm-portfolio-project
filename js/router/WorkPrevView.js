var WorkPrevView = Backbone.View.extend({
    model: null,
    
    
	/*
	 * Initialize with the template-id
	 */
	initialize: function( options ) {
        console.log(options);
        var model = options.data;
        var url = 'template/'+options.routeId+'.html';
        var view = this;
        $.get( url, function(data){
           view.template = _.template( $(data).html(), {name: model.name});
           view.render(); 
        })
	},

	/*
	 * Get the template content and render it into a new div-element
	 */
	render: function() {
        //configure view
        /*var content = this.template;
        var name = $(content).find('.name');
        $(content).find('.name').html(this.model.name);
        console.log($(content).find('.name').html(this.model.name)); */
        console.log(this.template);
        
        $('#work').find('#work-gallery').append(this.template);
		return this;
	}

});