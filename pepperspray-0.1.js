(function( $ ) {
	var settings;
	
	var methods = {
		init: function( options ) {
			// Defaults
			settings = $.extend({
				'disableRightClick'		: false,
				'disableHighlighting'	: false,
			}, options);
		},
		disableRightClick: function(state) {
			state = typeof(state) != 'undefined' ? state : settings["disableRightClick"];
			$('body').attr("oncontextmenu", "return " + !state + ";");
		},
		disableHighlighting: function(state) {
			state = typeof(state) != 'undefined' ? state : settings["disableHighlighting"];
			
			if(state == true) {
				$("body").bind("mousedown.pepperspray", function(event){
					event.preventDefault();

					return false;
				});
			} else {
				$("body").unbind("mousedown.pepperspray");
			}			
		}
	};
	
	$.extend({
		pepperspray: function(method) {
			if ( methods[method] ) {
	      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.pepperspray' );
	    }
	  }
	});
})( jQuery );