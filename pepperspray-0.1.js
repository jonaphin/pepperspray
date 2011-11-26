(function( $ ) {	
	var methods = {
		init: function( options ) {
			// Defaults
			settings = $.extend({
				'disableRightClick'		: false,
				'disableHighlighting'	: false,
				'disableBackButton'		: false
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
		},
		disableBackButton: function(state) {
			state = typeof(state) != 'undefined' ? state : settings["disableBackButton"];
			settings["disableBackButton"] = state;
			
			if(state) {
				var loc = window.location.href.replace(/#1/g, '') + "#1";
				window.location.href = loc;
				$.pepperspray("keepDisablingBackButton");
			}
		},
		keepDisablingBackButton: function() {
			if(!settings["disableBackButton"])
				return;
				
			if (window.location.hash != "#1")
				window.location.hash = "#1";
			
			setTimeout(function() { $.pepperspray("keepDisablingBackButton") }, 50);
		}
	};
	
	$.fn.pepperspray = function(method, options) {
		options = typeof(options) != 'undefined' ? options : {}
		if(typeof(settings) == 'undefined')
			methods['init'].apply(this, Array.prototype.slice.call( arguments, 2 ));
		
		if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.pepperspray' );
    }
  };
	
	$.extend({
		pepperspray: $.fn.pepperspray
	});
})( jQuery );