var TemplatedView = Backbone.View.extend({

	/*
	 * Initialize with the template-id
	 */
	initialize: function( options ) {
		this.template = _.template( options.template, options.data );
	},

	/*
	 * Get the template content and render it into a new div-element
	 */
	render: function() {
		var content = this.template;
		
		$(this.el).html(content);

		return this;
	}

});
