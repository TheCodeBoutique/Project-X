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
		var title = Asprouttrailer.trailerSelection.get('title');
		title.toString().toLowerCase();
		var newURLString = url + title;
		this.set(newURL, newURLString);
		return YES
	}
});

Asprouttrailer.trailersController = SC.ArrayController.create(
/** @scope Asprouttrailer.trailersController.prototype */ {

contentBinding:'Asprouttrailer.trailerSelection.trailers',

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');