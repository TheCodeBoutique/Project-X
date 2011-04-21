// ==========================================================================
// Project:   Asprouttrailer.moviesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Controller Here)
	<source src="http://trailers.apple.com/movies/fox/xmenfirstclass/xmenfirstclass-tlr1_r640s.mov" type="video/mp4">
	<source src="http://trailers.apple.com/movies/disney/cars2/cars2-Shu_r640s.mov" type="video/mp4">
  @extends SC.Object
*/
Asprouttrailer.moviesSearchController = SC.ObjectController.create({
	
	content:''
	

});
Asprouttrailer.moviesController = SC.ArrayController.create( {
	
		
	searchTrailer:null,
	showSearchTrailer:null,
	showiTunesreview:false,
	showTrailerPlayer:false,
	showFade:false,
	
	iTunesScreenAction:'fullScreen',
	iTunesTitleAction:'Full Screen',
	
	
	exit:'/static/asprouttrailer/en/current/source/resources/images/close_button.png?1301668615',

	
	summary: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
	      ret = len === 1 ? "1 Articles" : "%@ Articles".fmt(len);
	    } else ret = "Articles";

	    return ret;
	  }.property('length').cacheable(),
	
	performSearch: function() {    
			
			var searching = this.get("searchTrailer");
			console.log(searching);
			
		var tmp3 = Asprouttrailer.moviesController.get('content');
				//Asprouttrailer.moviesController.find()
				var set = SC.Set.create(tmp3);
				set.get('isEnumerable');
				set.findProperty('title',searching);
				var tmp4 = set.findProperty('title',searching);
				console.log(tmp3);
				console.log(set);
				console.log(tmp4);
				
				Asprouttrailer.moviesSearchController.set('content',tmp4);
				this.showSearch();
				Asprouttrailer.statechart.sendEvent('showSearchTrailer');
	  },
	showSearch:function(view)
	{
		var pane = SC.PickerPane.create({
      layout: { top: 200, left:300,width: 640,height: 272},
			mouseDown: function(evt) {
			    var layout = this.get('layout');
			    this._mouseDownInfo = {
			      pageX: evt.pageX, // save mouse pointer loc for later use
			      pageY: evt.pageY,
			      left:  layout.left, // save layout info 
			      top: layout.top
			    };
			    return YES; // so we get other events
			  },
				mouseUp: function(evt) {
				    // apply one more time to set final position
				    this.mouseDragged(evt); 
				    this._mouseDownInfo = null; // cleanup info



							var newTop = window.innerWidth/2;
							var newLeft = window.innerHeight/2;
							var heightFrame = newLeft/2;

						//console.log(newLeft + ' = left');
						//console.log(newTop + ' = top');

						this.animate('top',heightFrame,{duration:.5, timing:'ease-in-out'});
						this.animate('left',newLeft,{duration:.5, timing:'ease-in-out'});

				    return YES; // handled!
				  },
					mouseDragged: function(evt) {
					    var info = this._mouseDownInfo,
					        loc;

					    // handle X direction
					    loc = info.left + (evt.pageX - info.pageX);
					    this.adjust('left', loc);

					    // handle Y direction
					    loc = info.top + (evt.pageY - info.pageY) ;
					    this.adjust('top', loc);

					    return YES ; // event was handled!
					  },
				contentView: SC.LabelView.design({
							    //layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
				          escapeHTML: NO,
							    valueBinding:'Asprouttrailer.moviesSearchController.showSearchTrailer',
							  	}),
	    });
	    pane.popup(view, SC.PICKER_MENU);
	}


}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');