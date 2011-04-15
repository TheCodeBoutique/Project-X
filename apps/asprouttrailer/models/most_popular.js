// ==========================================================================
// Project:   Asprouttrailer.MostPopular
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.MostPopular = SC.Record.extend(
/** @scope Asprouttrailer.MostPopular.prototype */ {

	primaryKey: 'id', 

	title:SC.Record.attr(String),
	url:SC.Record.attr(String),
	poster:SC.Record.attr(String),
	exclusive:SC.Record.attr(String),
	hd:SC.Record.attr(String),
	itunesurl:SC.Record.attr(String),
	showtimesurl:SC.Record.attr(String),

}) ;
