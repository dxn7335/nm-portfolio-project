// Override View.remove()'s default behavior
Backbone.View = Backbone.View.extend({

	remove: function() {
		// Empty the element and remove it from the DOM while preserving events
		$(this.el).empty().detach();

		return this;
	},
    
    transitionIn: function (callback) {
        
        var view = this;
        
        var animateIn = function () {
          view.$el.find('.content').removeClass('page-nonactive');
          view.$el.find('.content').addClass('page-active');
          view.$el.one('transitionend', function () {
            if (_.isFunction(callback)) {
              callback();
            }
          });
        };

        _.delay(animateIn, 200);

    },
    
    transitionOut: function (callback) {

        var view = this;
        view.$el.find('.content').removeClass('page-active');
        view.$el.find('.content').addClass('page-nonactive');
        view.$el.one('transitionend', function () {
          if (_.isFunction(callback)) {
            callback();
          }
        });

    },

});
