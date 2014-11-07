/*---------------------------------------------------------------*/
/*
*   Portfolio Template Project
`   By, Danny Nguyen
    ==============================

    Content View:
        General view loaded in, similar to Backbone View
*/
/*---------------------------------------------------------------*/
var ContentView = Backbone.View.extend({

	/*
	 * Initialize with the template-id
	 */
	initialize: function(options) {
		this.template = options.template;
	},

	/*
	 * Get the template content and render it into a new div-element
	 */
	render: function() {
		var content = $(this.template).html();
		$(this.el).html(content);

		return this;
	},
    
});
