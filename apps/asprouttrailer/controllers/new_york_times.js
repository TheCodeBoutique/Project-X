// ==========================================================================
// Project:   Asprouttrailer.newYorkTimesController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/


Asprouttrailer.relatedURLController =  SC.ObjectController.create({
	
	contentBinding:'Asprouttrailer.nyMovieContent.related_urls',

});

Asprouttrailer.nyMovieContent = SC.ObjectController.create({

contentBinding:'Asprouttrailer.newYorkTimesController.selection',

currentPoster:'',
nyShowInformation: false,
isShowingNyExit:false,
  // TODO: Add your own code here.

}) ;

Asprouttrailer.newYorkTimesController = SC.ArrayController.create( {

	summary: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
	      ret = len === 1 ? "1 Articles" : "%@ Articles".fmt(len);
	    } else ret = "";

	    return ret;
	  }.property('length').cacheable(),

}) ;
