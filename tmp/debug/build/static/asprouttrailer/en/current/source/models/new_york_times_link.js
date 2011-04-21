// ==========================================================================
// Project:   Asprouttrailer.NewYorkTimesLink
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.NewYorkTimesLink = SC.Record.extend(
/** @scope Asprouttrailer.NewYorkTimesLink.prototype */ {

	link: SC.Record.toOne(
	    'Asprouttrailer.NewYorkTimes', 
	    { isMaster: NO }
	  ),
		type:SC.Record.attr(String),
		url: SC.Record.attr(String),
		suggested_link_text:SC.Record.attr(String),
		
		hyperLink: function() {
		    return '<a href=' + this.get('url') +'>'+ this.get('url');
		  }.property('url').cacheable(),

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');