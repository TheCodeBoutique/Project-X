// ==========================================================================
// Project:   Asprouttrailer.trailersController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Asprouttrailer.trailerContentController = SC.ObjectController.create ({
	
	contentBinding:'Asprouttrailer.trailersController.selection',
	
	newURL:'',
	
	observingURL:function() {
		var url = this.get('url');
		//console.log(url);
		var title = Asprouttrailer.trailerSelection.get('title');
		title.toString().toLowerCase();
		//console.log(title);
		var newURLString = url + title;
		this.set(newURL, newURLString);
		//console.log(newURLString);
		return YES,
	},
	
	
});

Asprouttrailer.trailersController = SC.ArrayController.create(
/** @scope Asprouttrailer.trailersController.prototype */ {

contentBinding:'Asprouttrailer.trailerSelection.trailers',

}) ;
