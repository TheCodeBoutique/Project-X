// ==========================================================================
// Project:   Asprouttrailer.NyMultimedia
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.NyMultimedia = SC.Record.extend({

	multimedia: SC.Record.toOne(
	    'Asprouttrailer.NewYorkTimes', 
	    { isMaster: NO }
	  ),
	 type:SC.Record.attr(String),
	 src:SC.Record.attr(String),
	
		srcLink: function() {
		    return '<a href=' + this.get('src') +'>'+ this.get('src');
		  }.property('src').cacheable(),

}) ;
