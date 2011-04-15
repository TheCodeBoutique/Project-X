// ==========================================================================
// Project:   Asprouttrailer.Trailer
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.Trailer = SC.Record.extend(
/** @scope Asprouttrailer.Trailer.prototype */ {

 trailer: SC.Record.toOne(
	    'Asprouttrailer.Trailers', 
	    { isMaster: NO }
	  ),
	 postdate:SC.Record.attr(String),
	 url:SC.Record.attr(String),
	type:SC.Record.attr(String),
	exclusive:SC.Record.attr(Boolean),
	hd:SC.Record.attr(Boolean),
	
	newURL:function (){
		return this.get('url');
	}.property('url').cacheable(),
	
		srcLink: function() {
		    return '<a href=' + this.get('url') +'>'+ this.get('url');
		  }.property('url').cacheable(),

}) ;
