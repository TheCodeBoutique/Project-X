// ==========================================================================
// Project:   Asprouttrailer.NewYorkTimes
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.NewYorkTimes = SC.Record.extend(
/** @scope Asprouttrailer.NewYorkTimes.prototype */ {

	primaryKey: 'nyt_movie_id', 
	//nyt_movie_id:SC.Record.attr(Number),
	display_title:SC.Record.attr(String),
	sort_name:SC.Record.attr(String),
	mpaa_rating: SC.Record.attr(String),
	thousand_best: SC.Record.attr(String),
	byline: SC.Record.attr(String),
	headline: SC.Record.attr(String),
	capsule_review: SC.Record.attr(String),
	summary_short: SC.Record.attr(String),
	publication_date: SC.Record.attr(String),
	opening_date: SC.Record.attr(String),
	date_updated: SC.Record.attr(String),
	seo_name: SC.Record.attr(String),
	
	
	link:SC.Record.toOne(
	    'Asprouttrailer.NewYorkTimesLink', 
	    { isMaster: YES, inverse: 'link', isNested: YES }
	  ),
	relatedUrls:SC.Record.toOne(
	    'Asprouttrailer.Relatedurls', 
	    { isMaster: YES, inverse: 'relatedUrls', isNested: YES }
	  ),
	multimedia:SC.Record.toOne(
	    'Asprouttrailer.Multimedia', 
	    { isMaster: YES, inverse: 'multimedia', isNested: YES }
	  ),
	
	//computed properties..
	movieTitleID: function() {
	    return '<b>MovieID</b> : 	' + this.get('primaryKey');
	  }.property('MovieID', 'primaryKey').cacheable(),
	
	displayTitle: function() {
	    return '<b>Title</b> : ' + this.get('display_title');
	  }.property('Title', 'display_title').cacheable(),
	
	movieRating: function() {
	    return '<b>Rating</b> : ' + this.get('mpaa_rating');
	  }.property('Rating', 'mpaa_rating').cacheable(),
	
	summary: function() {
	    return '<b>Summary</b> : ' + this.get('summary_short');
	  }.property('Summary', 'summary_short').cacheable(),
	
		releaseDate: function() {
		    return '<b>Release Date</b> : ' + this.get('publication_date');
		  }.property('Release Date', 'publication_date').cacheable(),
	
	reviewedBy: function() {
		    return '<b>Critic</b> : ' + this.get('byline');
		  }.property('Critic', 'byline').cacheable(),

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');