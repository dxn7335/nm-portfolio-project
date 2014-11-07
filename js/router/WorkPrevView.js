/*----------------------------------------------------------------------*/
/*
*   Portfolio Template Project
`   By, Danny Nguyen
    ==============================

    WorkPrevView:
        Acts like TemplateVIew, but loads in external template for
        work preview through ajax before filling and appending
*/
/*----------------------------------------------------------------------*/

var WorkPrevView = Backbone.View.extend({
    model: null,
    
    
	/*
	 * Initialize with the template-id
	 */
	initialize: function( options ) {
        var model = options.data;
        var url = 'template/'+options.routeId+'.html';
        var view = this;
        $.get( url, function(data){
           view.template = _.template( $(data).html(), model);
           view.render(); 
        })
	},

	/*
	 * Get the template content and render it into a new div-element
	 */
	render: function() {
        $('#work').find('#gallery').append(this.template);
		return this;
	}

});