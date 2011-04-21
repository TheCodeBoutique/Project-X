// ==========================================================================
// Project:   Asprouttrailer.trailerSelection
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
//this will be used to store the trailers by the user
Asprouttrailer.trailerPlayerSelection = SC.ObjectController.create({
	
	contentBinding:'Asprouttrailer.trailerPlayer.selection',
	
	currentTrailerPlaying:'',
	showCustomPlayerExit:false,
	customBackgroundImage:'',
	showExit:false,

});

Asprouttrailer.trailerPlayer = SC.ArrayController.create({

	playQueue:0,
	showDeleteQueue:false,
	
	//actionDeleteQueue:"Delete",
	
	test:function()
	{
		Asprouttrailer.trailerPlayer.set('content', Asprouttrailer.Queue);
	},
	
	sendChangesToServer: function(key) {
	    console.log('playQueue');
	console.log(key);
	  }.observes('playQueue', 'playQueue'),
	
	_applyContent: function() {

	    // wait a moment before loading to let things finish...
	    this.invokeLater(this.set, 50, "content", Asprouttrailer.Queue);
	  }.observes("content"),
}); 

Asprouttrailer.trailerSelection = SC.ObjectController.create({
	

	contentBinding:'Asprouttrailer.moviesController.selection',
	
	trailer:null,
	currentTime:null,
	showFade:NO,
		
	preferenceDidChange: function(key) {
	    //console.log('%@ did change!'.fmt(key));
	  }.observes('currentTime', 'currentTime')
	
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');