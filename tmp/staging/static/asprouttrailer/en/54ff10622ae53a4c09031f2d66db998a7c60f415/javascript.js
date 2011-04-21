/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   Asprouttrailer
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Asprouttrailer = SC.Application.create(
  /** @scope Asprouttrailer.prototype */ {

  NAMESPACE: 'Asprouttrailer',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  //store: SC.Store.create().from(SC.Record.fixtures)
  
	store: SC.Store.create({ commitRecordsAutomatically: YES }).from('Asprouttrailer.Datasource'),
	
	storeB: SC.Store.create({ commitRecordsAutomatically: YES }).from('Asprouttrailer.MostPopDataSource'),
	
	storeC: SC.Store.create({ commitRecordsAutomatically: YES }).from('Asprouttrailer.NewYorkTimesDataSource'),
	
	
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN __sc_chance.js */
if (typeof CHANCE_SLICES === 'undefined') var CHANCE_SLICES = [];CHANCE_SLICES = CHANCE_SLICES.concat([]);
/* >>>>>>>>>> BEGIN source/controllers/most_popular.js */
// ==========================================================================
// Project:   Asprouttrailer.mostPopularController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Asprouttrailer.subTrailersController = SC.ArrayController.create({	

	contentBinding:'Asprouttrailer.leftListResultsSelectionController.trailers'
	
});
Asprouttrailer.genreController = SC.ArrayController.create({	

	contentBinding:'Asprouttrailer.leftListResultsSelectionController.genre'
	
});
Asprouttrailer.actorsController = SC.ArrayController.create({
	

	contentBinding:'Asprouttrailer.leftListResultsSelectionController.actors'
	
});
Asprouttrailer.mostPopularResults = SC.ObjectController.create({
	

	content:''
	
}) ;

Asprouttrailer.mostPopularSelection = SC.ObjectController.create({
	
	contentBinding:'Asprouttrailer.mostPopularController.selection',
	
	trailer:null,
	currentTime:null,
	extraLargeImage:'',
	backgroundTrailerImage:'',
	movieWebSite:'',
	
	isShowingMoreInfo:false,
	
	max_min:'minimize',

	
	preferenceDidChange: function(key) {
	    //console.log('%@ did change!'.fmt(key));
	  }.observes('currentTime', 'currentTime')
	
}) ;

Asprouttrailer.searchResultsController = SC.ArrayController.create({
	contentBinding: 'Asprouttrailer.mostPopularController.searchContent',
	
	summary: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
	      ret = len === 1 ? "1 Results" : "%@ Results".fmt(len);
	    } else ret = "";

	    return ret;
	  }.property('length').cacheable(),
	
		preferenceDidChange: function(content) {
		    console.log('%@ did change!'.fmt(content));
		  }.observes('content', 'content'),
	
});

Asprouttrailer.leftListResultsController = SC.ArrayController.create({
contentBinding:'Asprouttrailer.leftListSearchResultsController.searchContent'
});
Asprouttrailer.leftListResultsSelectionController = SC.ObjectController.create({
contentBinding:'Asprouttrailer.leftListSearchResultsController.selection',

extraLargeImage:'',
backgroundTrailerImage:'',
movieWebSite:'',

});
Asprouttrailer.leftListSearchResultsController = SC.ArrayController.create({
	contentBinding: 'Asprouttrailer.mostPopularController.content',
	
	trailer:null,
	currentTime:null,
	extraLargeImage:'',
	backgroundTrailerImage:'',
	movieWebSite:'',
	
	// search stuff
	    search: null,
	    searchContent: null,

	    _updateSearchContent: function(){
					console.log("calling updateSeachContent");
	      var c = this.get('content');
	      var search = this.get('search');
	
				console.log(search);

	      if (!search || !c){
	        this.set('searchContent', c);
	      }
	      else {
	        search = search.toLowerCase();
	        var currItem;
					var currSearchFields;
	        var searchArray = [];
	
	        for(var i = 0, len = c.get('length'); i < len; i++){
	          currItem = c.objectAt(i);
						//console.log(currItem.title);
	          currSearchFields = currItem.title.toLowerCase();
						currSearchFields.toLowerCase();
						console.log(currSearchFields);
						
	
	          if (currSearchFields.match(search)) searchArray.push(currItem);
	        }

	        this.set('searchContent', searchArray);	
					      }
	    },


	    _searchHasChanged: function(){
				console.log("_searchHasChanged");
	      this._updateSearchContent();
	    }.observes('search'),

	    _contentHasChanged: function(){
	      this._updateSearchContent();
	    }.observes('[]'),
	
	
});

Asprouttrailer.mostPopularController = SC.ArrayController.create({
	
	activeController: null,
	startingIndex:0,
	thumbnailColumnWidth:50,
	mostPopularSearch:'',
	

	loadingImage:'/static/asprouttrailer/en/54ff10622ae53a4c09031f2d66db998a7c60f415/source/resources/images/close_button.png',
	
	// search stuff
	    search: null,
	    searchContent: null,

	    _updateSearchContent: function(){
					console.log("calling updateSeachContent");
	      var c = this.get('content');
	      var search = this.get('search');
	
				console.log(search);

	      if (!search || !c){
	        this.set('searchContent', c);
	      }
	      else {
	        search = search.toLowerCase();
	        var currItem;
					var currSearchFields;
	        var searchArray = [];
	
	        for(var i = 0, len = c.get('length'); i < len; i++){
	          currItem = c.objectAt(i);
						//console.log(currItem.title);
	          currSearchFields = currItem.title.toLowerCase();
						currSearchFields.toLowerCase();
						console.log(currSearchFields);
						
	
	          if (currSearchFields.match(search)) searchArray.push(currItem);
	        }

	        this.set('searchContent', searchArray);
					
	      }
	    },


	    _searchHasChanged: function(){
				console.log("_searchHasChanged");
	      this._updateSearchContent();
	    }.observes('search'),

	    _contentHasChanged: function(){
	      this._updateSearchContent();
	    }.observes('[]'),
	

	summary: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
	      ret = len === 1 ? "1 Movies" : "%@ Movies".fmt(len);
	    } else ret = "";

	    return ret;
	  }.property('length').cacheable(),
	
		preferenceDidChange: function(content) {
		    console.log('%@ did change!'.fmt(content));
		  }.observes('content', 'content'),


}) ;

/* >>>>>>>>>> BEGIN source/controllers/movies.js */
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
	
	
	exit:'/static/asprouttrailer/en/54ff10622ae53a4c09031f2d66db998a7c60f415/source/resources/images/close_button.png',

	
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

/* >>>>>>>>>> BEGIN source/controllers/new_york_times.js */
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

/* >>>>>>>>>> BEGIN source/controllers/trailer_selection.js */
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

/* >>>>>>>>>> BEGIN source/controllers/trailers.js */
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

/* >>>>>>>>>> BEGIN source/models/trailers.js */
// ==========================================================================
// Project:   Asprouttrailer.Trailers
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.Trailers = SC.Record.extend(
/** @scope Asprouttrailer.Trailers.prototype */ {
primaryKey: 'title', 

title:SC.Record.attr(String),
releasedate:SC.Record.attr(String),
studio:SC.Record.attr(String),
poster:SC.Record.attr(String),
moviesite:SC.Record.attr(String),
location:SC.Record.attr(String),
rating:SC.Record.attr(String),
//genre:SC.Record.attr(String),
//directors:SC.Record.attr(String),
//actors:SC.Record.attr(String),
   

trailers:SC.Record.toOne(
    'Asprouttrailer.Trailer', 
    { isMaster: YES, inverse: 'trailer', isNested: YES }
  ),
	hyperLink: function() {
			var moviewURL = this.get('location');
			 moviewURL.replace("/trailers", "");
			console.log(moviewURL);
			
	    return "<video id='' class='video' x-webkit-airplay='allow' width='640' height='272' " + this.get('poster') +'autoplay="autoplay" bgcolor="white">'+ '<source src="http://trailers.apple.com/movies' + this.moviewURL +'type="video/mp4">' + '</video>';
	  }.property('poster').cacheable(),
//<source src="http://trailers.apple.com/movies/lionsgate/conanthebarbarian/conanthebarbarian-tlr1_r640s.mov" type="video/mp4"></video>
									
//<video id="" class="video" x-webkit-airplay="allow" width="640" height="272" poster="http://trailers.apple.com/trailers/global/elements/quicktime/qt_endstate640x400.jpg" autoplay="autoplay" bgcolor="white">
}) ;

/* >>>>>>>>>> BEGIN source/data_sources/datasource.js */
// ==========================================================================
// Project:   Asprouttrailer.Datasource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
		var 
		console.log(resultsQuery);
		
		console.log(results.status);
		var statusChange = results.status;
*/
sc_require('models/trailers');
resultsQuery = SC.Query.remote(Asprouttrailer.Trailers);
Asprouttrailer.Datasource = SC.DataSource.extend(
/** @scope Asprouttrailer.Datasource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {		
		
		//Sproutpress.statechart.sendEvent('sendingRequest');
		//console.log(query === resultsQuery);
		//console.log(store);
		console.log(store.status);
		//console.log(resultsQuery);
		//var tmp = resultsQuery;
		//console.log(tmp);
		
  if (query === resultsQuery) {
	  SC.Request.getUrl('/just_added').json()
	    .notify(this, 'fetchDidComplete', store, query)
			      .send();
			
			    return YES;
			}
			return NO;
	},
	
	fetchDidComplete: function(response, store, query) {
		var data;
	  if (SC.ok(response)) {
					data = response.get('body');
		     var storeKeys = store.loadRecords(Asprouttrailer.Trailers, response.get('body'));

					//console.log(storeKeys);
					//console.log(data);
					Asprouttrailer.moviesController.set('content', data);
		          store.loadQueryResults(query, storeKeys);
		  } else store.dataSourceDidErrorQuery(query, response);
		     },
	
	

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {

    return NO ; // return YES if you handled the storeKey
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/models/most_popular.js */
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

/* >>>>>>>>>> BEGIN source/data_sources/most_pop.js */
// ==========================================================================
// Project:   Asprouttrailer.MostPopDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/most_popular');
popResultsQuery = SC.Query.remote(Asprouttrailer.MostPopular);
Asprouttrailer.MostPopDataSource = SC.DataSource.extend(
	/** @scope Asprouttrailer.Datasource.prototype */ {

	  // ..........................................................
	  // QUERY SUPPORT
	  // 

	  fetch: function(store, query) {		

			//Sproutpress.statechart.sendEvent('sendingRequest');
			//console.log(query === popResultsQuery);
			//console.log(store);
			//console.log(query.status);
			//console.log(popResultsQuery);
			//var tmp = popResultsQuery;
			//console.log(tmp);

	  if (query === popResultsQuery) {
		  SC.Request.getUrl('/most_pop').json()
		    .notify(this, 'fetchDidComplete', store, query)
				      .send();

				    return YES;
				}
				return NO;
		},

		fetchDidComplete: function(response, store, query) {
			var data;
		  if (SC.ok(response)) {
						data = response.get('body');
			     var storeKeys = store.loadRecords(Asprouttrailer.MostPopular, response.get('body'));

						//console.log(storeKeys);
						//console.log(data);
						Asprouttrailer.mostPopularController.set('content', data);
			          store.loadQueryResults(query, storeKeys);
			  } else store.dataSourceDidErrorQuery(query, response);
			     },
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/models/new_york_times.js */
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

/* >>>>>>>>>> BEGIN source/data_sources/new_york_times.js */
// ==========================================================================
// Project:   Asprouttrailer.NewYorkTimesDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/new_york_times');

Asprouttrailer.NewYorkTimesDataSource = SC.DataSource.extend(
/** @scope Asprouttrailer.NewYorkTimesDataSource.prototype */ {

	fetch: function(store, query) {		
		var api = "&api-key=68e305c1b4e781d3343b549c634e4b97:16:63367658";
		var critics = "&critics-pick=y&";
		//var search = Sproutpress.dataController.get('query');
		//console.log(search);
		//var myQuery = '&query=' + search;
		//console.log(myQuery);	
		

	  SC.Request.getUrl('/search.json?'  + api).json()
	    .notify(this, 'fetchDidComplete', store, query)
			      .send();
			    return YES;
	},
	
	fetchDidComplete: function(response, store, query) {
	    var data;
	    if (SC.ok(response)) {
	      data = response.get('body').results;
				//console.log(data);

	      var storeKeys = store.loadRecords(Asprouttrailer.NewYorkTimes, data);
	
				Asprouttrailer.newYorkTimesController.set('content', data);
	      store.loadQueryResults(query, storeKeys);
				//console.log(storeKeys);
				//console.log(query);
				//data.push();

	      store.dataSourceDidFetchQuery(query);
	    } 
	    else store.dataSourceDidErrorQuery(query, response);
	  },

  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/models/new_york_times_link.js */
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

/* >>>>>>>>>> BEGIN source/models/ny_multimedia.js */
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

/* >>>>>>>>>> BEGIN source/models/ny_relatedurls.js */
// ==========================================================================
// Project:   Asprouttrailer.NyRelatedurls
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.NyRelatedurls = SC.Record.extend(
/** @scope Asprouttrailer.NyRelatedurls.prototype */ {

  // TODO: Add your own code here.

}) ;

/* >>>>>>>>>> BEGIN source/models/trailer.js */
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

/* >>>>>>>>>> BEGIN source/views/custom_grid.js */
//SC.LOG_OBSERVERS = YES;
//SC.LOG_BINDINGS = YES
var p = 0;
var i = 0;
Asprouttrailer.CustomGrid = SC.View.extend({ 

      	content: null,
				displayProperties: 'isSelected'.w(),

				
		 createChildViews: function(){
			 var childViews = [];
		   var content = this.get('content');
			  var selection = this.get('selection');
				console.log(selection);
			
				var newTitle = content.title;
				
				//this is small images being pulled from apple site 
			 	var posterImages =  content.poster;
			
				var xLargeImage = posterImages.replace("/poster","/poster-xlarge");
				//console.log(xLargeImage);
				
				if(SC.none(content)) return;
				{
					var background = this.createChildView(
							SC.View.design({
									classNames:['trail'],
							    layout:{top:10,bottom:10,right:10,left:10},
									//backgroundColor:'black',									
									})
									);
									childViews.push(background);
									
						var title = this.createChildView(
										SC.LabelView.design({
											 layout: { bottom:20, height: 24, left:10, width: 200 },
											 controlSize: SC.AUTO_CONTROL_SIZE,
											 fontWeight: SC.BOLD_WEIGHT,
											 escapeHTML: NO,
											 isTextSelectable: YES,
											 value:newTitle,				
											})
										);
						//childViews.push(title);
						
						var poster = this.createChildView(
										SC.ImageView.design({
											classNames:['poster'],
								 			layout:{top:30,bottom:50,right:20,left:20},
								 			useImageQueue: NO, 
								 			value:xLargeImage,
										})
								);
								childViews.push(poster);
								
								var add = this.createChildView(
											SC.ButtonView.design({
											        layout: { bottom: 20, height: 24, right: 25, width: 70 },
															controlSize: SC.SMALL_CONTROL_SIZE,
															content: content,
											        title:  "Add",
															action:"addTrailer",
															addTrailer:function()
															{
																var tmp = this.get('content');
																
																
																var newDirectors = content.directors;
																var newGenre = content.genre;
																var newLocation = content.location;
																var newMoviesite = content.moviesite;
																
																var newPoster = content.poster;
																var newRating = content.rating;
																var newReleasedate = content.releasedate;
																var newStudio = content.studio;
																
																var newTitle = content.title;
																var newTrailers = content.trailers;

																//p += content.cost;
																i++;
																Asprouttrailer.trailerPlayer.set('playQueue',i);
																Asprouttrailer.trailerPlayer.sendChangesToServer('playQueue');
																//Shopping.checkoutController.set('cost',p);
																console.debug(i);
																var add = SC.Object.create({
																		directors : newDirectors,
																		genre : newGenre,
																		location : newLocation,
																		moviesite : newMoviesite,
																		poster : newPoster,
																		rating : newRating,
																		releasedate : newReleasedate,
																		studio : newStudio,
																		title : newTitle,
																		trailers :newTrailers,
																	});
																	//this pushes the objects to the controller 
																	Asprouttrailer.Queue.push(add);
																	// this updates the array controller 
																	Asprouttrailer.trailerPlayer.invokeLast( function() {
																	  this.set('content', [add]) ;
																	});
															}
														})
													);
													childViews.push(add);
													
													var play = this.createChildView(
															SC.ButtonView.design({
															        layout: { bottom: 20, height: 24, left: 20, width: 70 },
															        title:  "Play",
																			controlSize: SC.SMALL_CONTROL_SIZE,
																			content: content,
																			//target:"Asprouttrailer.statechart",
														 					action:"viewTrailer",
																			isDefault: YES,
																	
															})
															);
															childViews.push(play);
								
								
						this.set('childViews', childViews);
					}
		   
		}


});
/* >>>>>>>>>> BEGIN source/views/trailers_list_item.js */
// ==========================================================================
// Project:   Asprouttrailer.TrailersListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your View Here)

  @extends SC.ListItemView
*/
Asprouttrailer.TrailersListItemView = SC.ListItemView.extend({
  
  escapeHTML: NO,
  
 classNames: ['sc-list-item-view'],
});

/* >>>>>>>>>> BEGIN source/views/custom_queue.js */
//SC.LOG_OBSERVERS = YES;
//SC.LOG_BINDINGS = YES
var p = 0;
var i = 0;
Asprouttrailer.CustomQueue = SC.View.extend({ 

      	content: null,
				displayProperties: 'isSelected'.w(),

				
		 createChildViews: function(){
			 var childViews = [];
		   var content = this.get('content');
			  var selection = this.get('selection');
				console.log(selection);
			
				var newTitle = content.title;
				console.log(newTitle);
			 	var posterImages =  content.poster;
				
				if(SC.none(content)) return;
				{					
						var title = this.createChildView(
										SC.LabelView.design({
											 layout: { centerY:0, height: 24, left:10, width: 200 },
											 controlSize: SC.AUTO_CONTROL_SIZE,
											 fontWeight: SC.BOLD_WEIGHT,
											 escapeHTML: NO,
											 isTextSelectable: YES,
											 value:newTitle,				
											})
										);
						childViews.push(title);
						
								
								var add = this.createChildView(
											SC.ButtonView.design({
															isVisibleBinding:'Asprouttrailer.trailerPlayer.showDeleteQueue',
											        layout: { centerY: 0, height: 24, right: 25, width: 90 },
															content: content,
											        title:  "Delete",
															action:"remove",
															remove:function()
															{
																var remove = this.get('content');

																console.log(remove);
																
																i -1;
																//cot.invoke('destroy');
																var itm = Asprouttrailer.trailerPlayer.get('playQueue');
																itm -= 1;
																 i = itm;

																Asprouttrailer.trailerPlayer.set('playQueue',itm);

																Asprouttrailer.trailerPlayer.invokeLast( function() {
																  this.removeObject(remove);
																})
															}
														
														})
													);
													childViews.push(add);
								
								
						this.set('childViews', childViews);
					}
		   
		}


});
/* >>>>>>>>>> BEGIN source/views/custom_player.js */
//SC.LOG_OBSERVERS = YES;
//SC.LOG_BINDINGS = YES
var p = 0;
var i = 0;
Asprouttrailer.CustomPlayer = SC.View.extend({ 

      	content: null,
				displayProperties: 'isSelected'.w(),

				
		 createChildViews: function(){
			 var childViews = [];
		   var content = this.get('content');
			  var selection = this.get('selection');
				console.log(selection);
			
				var newTitle = content.title;
				console.log(newTitle);
			 	var posterImages =  content.poster;
				
				if(SC.none(content)) return;
				{					
						var title = this.createChildView(
										SC.LabelView.design({
											 layout: { centerY:0, height: 24, left:10, width: 200 },
											 controlSize: SC.AUTO_CONTROL_SIZE,
											 fontWeight: SC.BOLD_WEIGHT,
											 escapeHTML: NO,
											 isTextSelectable: YES,
											 value:newTitle,				
											})
										);
						childViews.push(title);
						
								
								var add = this.createChildView(
											SC.ButtonView.design({
															isVisibleBinding:'Asprouttrailer.trailerPlayer.showDeleteQueue',
											        layout: { centerY: 0, height: 24, right: 25, width: 90 },
															content: content,
											        title:  "Delete",
															action:"remove",
															remove:function()
															{
																var remove = this.get('content');

																console.log(remove);
																
																i -1;
																//cot.invoke('destroy');
																var itm = Asprouttrailer.trailerPlayer.get('playQueue');
																itm -= 1;
																 i = itm;

																Asprouttrailer.trailerPlayer.set('playQueue',itm);

																Asprouttrailer.trailerPlayer.invokeLast( function() {
																  this.removeObject(remove);
																})
															}
														
														})
													);
													childViews.push(add);
								
								
						this.set('childViews', childViews);
					}
		   
		}


});
/* >>>>>>>>>> BEGIN source/resources/just_added.js */
sc_require('views/custom_grid.js');
sc_require('views/trailers_list_item.js');
sc_require('views/custom_queue.js');
sc_require('views/custom_player.js');
Asprouttrailer.justAddedPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load 
  mainPane: SC.MainPane.design({
    childViews: 'navigationBar justAdded fade fadeTwo itunesReview trailerPlayer black'.w(),

		defaultResponder: Asprouttrailer.statechart,
		
		black:SC.View.design({
				classNames:['fading'],
		    layout:{top:0,bottom:0,right:0,left:0},
		    backgroundColor:'black',
				isVisibleBinding:'Asprouttrailer.moviesController.showFade',
		}),
		
		
		trailerPlayer:SC.View.design({
				classNames:['customPlayer'],
				isVisibleBinding:'Asprouttrailer.moviesController.showTrailerPlayer',
		    layout:{centerX:0,centerY:0,width:840,height:400},
				backgroundColor:'white',
				mouseEntered: function(evt) {
					        Asprouttrailer.trailerPlayerSelection.set('showCustomPlayerExit',true);
					        return YES
					    },
							mouseExited: function() {
								 Asprouttrailer.trailerPlayerSelection.set('showCustomPlayerExit',false);
				        return YES
								},
		    childViews:'rightList horizontalDivider trailerScreen exit detail'.w(),
				rightList:SC.ScrollView.design({
						    hasHorizontalScroller: NO,
						    layout: {top: 0, bottom:117, width:200, right:0},

								contentView:SC.ListView.design({
										    	contentValueKey: "title",
													contentBinding: "Asprouttrailer.trailerPlayer.arrangedObjects",
													selectionBinding: "Asprouttrailer.trailerPlayer.selection",
									  			rowHeight: 40,
													//exampleView:Asprouttrailer.CustomPlayer,
													actOnSelect:YES,
													target:'Asprouttrailer.statechart',
													action:'customPlayer',
										    	})
												}),
												exit:SC.ButtonView.design({
																isVisibleBinding:'Asprouttrailer.trailerPlayerSelection.showCustomPlayerExit',
												        layout: { top: 0, left: 0, height:30, width: 30 },
												        title:  "X",
																controlSize: SC.SMALL_CONTROL_SIZE,
																action: "exit",
																isDefault: YES,
																exit:function(){Asprouttrailer.moviesController.set('showTrailerPlayer',false);Asprouttrailer.moviesController.set('showFade',false);},
												      }),
												trailerScreen:SC.View.design({
												    layout:{top:0,bottom:118,right:200,left:0},
														backgroundColor:'black',
												    childViews:'backgroundImage moivePlayer'.w(),
												
															backgroundImage:SC.ImageView.design({
																		useImageQueue: NO, 
																		valueBinding:'Asprouttrailer.trailerPlayerSelection.customBackgroundImage',
															    }),
												 	 				moivePlayer:SC.LabelView.design({
												 	 		    		layout: { top: 0, bottom: 0, left: 0, right:0 },
												 	         		escapeHTML: NO,
												 	 		    		valueBinding:'Asprouttrailer.trailerPlayerSelection.currentTrailerPlaying'
												 	 		  			}),
																		}),
														horizontalDivider:SC.ToolbarView.design({
												  		layout: { bottom: 118, left: 0, right: 0, height: 8 },  
												  		//childViews:' '.w(),
															}),
															detail:SC.View.design({
															    layout:{height:118,bottom:0,right:0,left:0},
															    childViews:'poster director moviesite studio rating'.w(),
																	poster:SC.ImageView.design({
																				//classNames:['sprout'],
																				layout: { bottom:10, left:10, height:100, width: 60 },
																				useImageQueue: NO, 
																				valueBinding:'Asprouttrailer.trailerPlayerSelection.poster',
																	    }),
																			director:SC.LabelView.design({
																						    layout: { left:80, bottom:110, height: 24, width: 300 },
																			          escapeHTML: NO,
																						    isTextSelectable: YES,
																						    valueBinding:'Asprouttrailer.trailerPlayerSelection.directors'
																						  	}),
																								moviesite:SC.LabelView.design({
																											    layout: { left:80, bottom:80, height: 24, width: 300 },
																								          escapeHTML: NO,
																											    isTextSelectable: YES,
																											    valueBinding:'Asprouttrailer.trailerPlayerSelection.moviesite'
																											  	}),
																													studio:SC.LabelView.design({
																																    layout: { left:80, bottom:60, height: 24, width: 300 },
																													          escapeHTML: NO,
																																    isTextSelectable: YES,
																																    valueBinding:'Asprouttrailer.trailerPlayerSelection.studio'
																																  	}),
																																		rating:SC.LabelView.design({
																																					    layout: { left:80, bottom:40, height: 24, width: 300 },
																																		          escapeHTML: NO,
																																					    isTextSelectable: YES,
																																					    valueBinding:'Asprouttrailer.trailerPlayerSelection.rating'
																																					  	}),
															})
														}),
		itunesReview:SC.View.design({
				classNames:['itunesReview'],
			  isVisibleBinding:'Asprouttrailer.moviesController.showiTunesreview',
		    layout:{top:45,bottom:50,right:100,left:257},
				backgroundColor:'white',
				mouseEntered: function(evt) {
									console.log('entering');
					        Asprouttrailer.mostPopularSelection.set('isShowingMoreInfo',true);
					        return YES
					    		},
								mouseExited: function(evt) {
										console.log('exiting');
										Asprouttrailer.mostPopularSelection.set('isShowingMoreInfo',false);
				        		return YES
										},
		    childViews:'topBar detail '.w(),
		
				detail:SC.View.design({
				    layout:{top:0,bottom:0,right:0,left:0},
				    childViews:'background directors actors genre moviesite studio'.w(),
						
							directors: SC.LabelView.design({
												classNames:['itunesFont'],
										    layout: { top:45, height: 24, right:0.3, width: 200 },
										    controlSize: SC.AUTO_CONTROL_SIZE,
                        escapeHTML: NO,
										    isTextSelectable: YES,
										    valueBinding:'Asprouttrailer.leftListResultsSelectionController.directors'
										  	}),
												actors: SC.LabelView.design({
																	classNames:['itunesFont'],
															    layout: { top:145, height: 340, right:0.13, width: 280 },
															    controlSize: SC.AUTO_CONTROL_SIZE,
					                        escapeHTML: NO,
															    isTextSelectable: YES,
																	isTextArea:YES,
															    valueBinding:'Asprouttrailer.actorsController.content'
															  	}),
																	genre:SC.LabelView.design({
																						classNames:['itunesFont'],
																				    layout: { top:65, height: 340, right:0.13, width: 280 },
																				    controlSize: SC.AUTO_CONTROL_SIZE,
										                        escapeHTML: NO,
																				    isTextSelectable: YES,
																						isTextArea:YES,
																				    valueBinding:'Asprouttrailer.genreController.content'
																				  	}),
																						moviesite:SC.LabelView.design({
																											classNames:['itunesFont'],
																									    layout: { top:75, height: 340, right:0.1, width: 280 },
																									    //controlSize: SC.AUTO_CONTROL_SIZE,
															                        escapeHTML: NO,
																									    valueBinding:'Asprouttrailer.leftListResultsSelectionController.movieWebSite'
																									  	}),
																											studio:SC.LabelView.design({
																																classNames:['itunesFont'],
																														    layout: { top:160, height: 340, right:0.15, width: 280 },
																														    controlSize: SC.AUTO_CONTROL_SIZE,
																				                        escapeHTML: NO,
																														    isTextSelectable: YES,
																																isTextArea:YES,
																														    valueBinding:'Asprouttrailer.leftListResultsSelectionController.studio'
																														  	}),
																						
																
												background:SC.ImageView.design({
															//classNames:['sprout'],
															layout: { top: 0, bottom:0, left:0, right: 0 },
															useImageQueue: NO, 
															valueBinding: 'Asprouttrailer.leftListResultsSelectionController.backgroundTrailerImage',
												    }),
														poster: SC.ImageView.design({
																//classNames:['sprout'],
																layout: { left:10, top:25, height:350, width: 240 },
																useImageQueue: NO, 
																valueBinding: 'Asprouttrailer.leftListResultsSelectionController.extraLargeImage',
													    	}),
													}),//end of detail
														
				topBar: SC.ToolbarView.design({
				  layout:{ top: 0, left: 0, right: 0, height: 40 },  
					isVisibleBinding:'Asprouttrailer.mostPopularSelection.isShowingMoreInfo',
				  childViews:'title fullScreen exit minimize'.w(),
						title: SC.LabelView.design({
									    layout: { centerY: 0, height: 20, left:30, width: 300 },
									    controlSize: SC.AUTO_CONTROL_SIZE,
									    fontWeight: SC.BOLD_WEIGHT,
						          escapeHTML: NO,
									    isTextSelectable: YES,
											value:'Most Popular'
									  	}),
											
									fullScreen: SC.ButtonView.design({
											        layout: { centerY: 0, height: 24, right: 12, width: 100 },
											        titleBinding:'Asprouttrailer.moviesController.iTunesTitleAction',
															controlSize: SC.REGULAR_CONTROL_SIZE,
															actionBinding:'Asprouttrailer.moviesController.iTunesScreenAction',
															isDefault: YES,
															fullScreen:function()
															{
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('top',0,{duration:.5, timing:'ease-in-out'});
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('bottom',0,{duration:.5, timing:'ease-in-out'});
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('left',0,{duration:.5, timing:'ease-in-out'});
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('right',0,{duration:.5, timing:'ease-in-out'});
																//this.set('action','normalScreen');
																Asprouttrailer.moviesController.set('iTunesTitleAction','Normal');
																Asprouttrailer.moviesController.set('iTunesScreenAction','normalScreen');
															},
															normalScreen:function()
															{
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('top',45,{duration:.5, timing:'ease-in-out'});
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('bottom',50,{duration:.5, timing:'ease-in-out'});
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('left',257,{duration:.5, timing:'ease-in-out'});
																Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('right',100,{duration:.5, timing:'ease-in-out'});
																Asprouttrailer.moviesController.set('iTunesTitleAction','Full Screen');
																Asprouttrailer.moviesController.set('iTunesScreenAction','fullScreen');
															}
											      }),
																exit: SC.ButtonView.design({
																				classNames:['redButton'],
																        layout: { left:0, height: 17, top:0, width: 17 },
																        title:  "X",
																				controlSize: SC.SMALL_CONTROL_SIZE,
																				//target: "ScCommunityMarketing.betaController",
																				action: "exit",
																				//isDefault: YES
																				exit:function()
																				{
																					Asprouttrailer.moviesController.set('showiTunesreview',false);
																					Asprouttrailer.mostPopularSelection.set('max_min','maximize');
																					
																					//set back to regular size
																						Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('left',257,{duration:.5, timing:'ease-in-out'});
																						Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('top',45,{duration:.5, timing:'ease-in-out'});
																						Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('right',100,{duration:.5, timing:'ease-in-out'});
																						Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('bottom',50,{duration:.5, timing:'ease-in-out'});																									
																						Asprouttrailer.mostPopularSelection.set('max_min','minimize');
																					
																				}
																      }),
																				minimize:SC.ButtonView.design({
																								classNames:['redButton'],
																				        layout: { left:0, height: 17, bottom:3, width: 17 },
																				        title:  "-",
																								controlSize: SC.SMALL_CONTROL_SIZE,
																								//target: "ScCommunityMarketing.betaController",
																								actionBinding: "Asprouttrailer.mostPopularSelection.max_min",
																								//isDefault: YES
																								minimize:function()
																								{
																									var tmp = Asprouttrailer.justAddedPage.mainPane.itunesReview.get('frame');
																									console.log(tmp);
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('left',1066,{duration:.5, timing:'ease-in-out'});
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('top',533,{duration:.5, timing:'ease-in-out'});
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('right',80,{duration:.5, timing:'ease-in-out'});
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('bottom',40,{duration:.5, timing:'ease-in-out'});
																									Asprouttrailer.mostPopularSelection.set('max_min','maximize');
																								},
																								maximize:function()
																								{
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('left',257,{duration:.5, timing:'ease-in-out'});
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('top',45,{duration:.5, timing:'ease-in-out'});
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('right',100,{duration:.5, timing:'ease-in-out'});
																									Asprouttrailer.justAddedPage.mainPane.itunesReview.animate('bottom',50,{duration:.5, timing:'ease-in-out'});																									
																									Asprouttrailer.mostPopularSelection.set('max_min','minimize');
																								}
																				      }),
					})
		}),
		
		navigationBar: SC.ToolbarView.design({
		  layout: { top: 0, left: 0, right: 0, height: 45 },  
			  childViews:'justAdded mostPopular search trailerQueue trailersAdded results netflix'.w(),
				
				netflix: SC.LabelView.design({
							    layout: { centerY: 0, height: 30, right: 100, width: 200 },
							    controlSize: SC.LARGE_CONTROL_SIZE,
							    fontWeight: SC.BOLD_WEIGHT,
				          escapeHTML: NO,
							    value:'Netflix'
							  	}),
				results:SC.LabelView.design({
							    layout: { centerY: 0, height: 30, centerX:0, width: 95 },
							    controlSize: SC.LARGE_CONTROL_SIZE,
							    fontWeight: SC.BOLD_WEIGHT,
				          escapeHTML: NO,
							    isTextSelectable: YES,
							    valueBinding:'Asprouttrailer.searchResultsController.summary',
									mouseDown: function(evt) {
										 				Asprouttrailer.statechart.sendEvent('searchResultsPopup');
										        return YES
										    },
												mouseUp: function() {
									        console.log('you leaving hovering');
													// /this.animate('width',180,{duration:.3,timing:'ease-in-out'});
									        return YES
													},
							  	}),
				search:SC.TextFieldView.design({
					            layout: { centerY: 0, height: 24, left:300, width:100 },
					            controlSize: SC.LARGE_CONTROL_SIZE,
					            fontWeight: SC.BOLD_WEIGHT,
					            hint: 'search ',
					            valueBinding: 'Asprouttrailer.mostPopularController.search',
					            //target: "Asprouttrailer.mostPopularController",
					            //action: "_searchHasChanged",
											mouseEntered: function(evt) {
												        this.animate('width',200,{duration:.5, timing:'ease-in-out'});
																return YES
												    },
					            keyDown: function(evt) {
					              arguments.callee.base.apply(this,arguments); // necessary to guarantee regular handling of keyDown events, 
					                           // want to avoid that this overwrite messes everything up     	   
					              if (evt.keyCode === 13) {
					                // trigger the search after we've seen an "enter"
					                Asprouttrailer.mostPopularController._updateSearchContent(); 
													//this.set('value','');
													this.animate('width',100,{duration:.5, timing:'ease-in-out'});
					                return YES;
					              } else {
					                return NO;
					              }
					            }}),
			justAdded: SC.LabelView.design({
							    layout: { centerY: 0, height: 24, left:40, width: 80 },
				          escapeHTML: NO,
							    //isTextSelectable: YES,
							    value:"Just Added",
									mouseEntered: function(evt) {
										        this.animate('scale',1.5,{duration:.3, timing:'ease-in-out'});
										        return YES
										    },
								mouseExited: function() {
													this.animate('scale',1,{duration:.3, timing:'ease-in-out'});
									        return YES
													},
									mouseDown: function(evt) {
										        Asprouttrailer.statechart.sendEvent('justAdded');
										        return YES
										    },
								 mouseUp: function() {

								   return YES
								 	},
								}),
 								mostPopular: SC.LabelView.design({
 												    layout: { centerY: 0, height: 24, left:180, width: 80 },
 									          escapeHTML: NO,
 												    //isTextSelectable: YES,
 												    value:"Most Popular",
 								 					mouseEntered: function(evt) {this.animate('scale',1.5,{duration:.3, timing:'ease-in-out'});return YES},
 								 					mouseExited: function() {this.animate('scale',1,{duration:.3, timing:'ease-in-out'});return YES	},
 								 					mouseDown: function(evt) { Asprouttrailer.statechart.sendEvent('mostPopular');return YES },
 								 					mouseUp: function() { return YES},
 								 					touchStart: function(evt){  Asprouttrailer.statechart.sendEvent('mostPopular'); return YES},
 								 					touchEnd: function(evt){ return YES},
 								 					}),
													trailerQueue:SC.ButtonView.design({
													        layout: { centerY:0, height: 30, right: 12, width: 100 },
													        title:  "Trailers",
																	//target: "ScCommunityMarketing.betaController",
																	action: "addTrailer",
																	isDefault: YES,
																	//all the these function can be moved to states in final release
																	addTrailer:function(view)
																	{
																		var pane = SC.PickerPane.create({ layout: {width: 275,height: 250},
																								contentView: SC.View.design({
																								    layout:{top:0,bottom:0,right:0,left:0},
																								    childViews:'topBar queueContent bottomBar'.w(),
																								
																								bottomBar:SC.ToolbarView.design({
																										  layout: { bottom: 0, left: 0, right: 0, height: 30 },  
																										  childViews:'playButton'.w(),
																											playButton:SC.ButtonView.design({
																											        layout: { centerY:0, height: 24, left: 10, width: 40 },
																											        title: "P",
																															controlSize: SC.REGULAR_CONTROL_SIZE,																															
																															action: "showPlayer",
																															isDefault: YES,
																															showPlayer:function()
																															{
																																Asprouttrailer.moviesController.set('showTrailerPlayer',true);
																																Asprouttrailer.moviesController.set('showFade',true);
																																pane.remove();
																																this.invokeLater(this.sendFade,1100);
																																
																															},
																															sendFade:function()
																															{
																																Asprouttrailer.statechart.sendEvent('fade');
																															}
																											      }),
																													}),
																											
																											topBar:SC.ToolbarView.design({
																											  layout: { rop: 0, left: 0, right: 0, height: 30 },  
																											  childViews:'editButton'.w(),
																													
																													editButton:SC.ButtonView.design({
																												        layout: { centerY:0, height: 24, right: 10, width: 45 },
																												        title:  "Edit",
																																action: "remove",
																																isDefault: YES,
																																remove: function()
																																{
																																	var status = 	Asprouttrailer.trailerPlayer.get('showDeleteQueue');
																																	console.log(status);
																																	if(status === true)
																																	{
																																	Asprouttrailer.trailerPlayer.set('showDeleteQueue',false);
																																	this.set('title','Edit');
																																	}else if(status === false)
																																	{
																																		Asprouttrailer.trailerPlayer.set('showDeleteQueue',true);
																																		this.set('title','Cancel');
																																	}
																																},
																												      }),
																														}),
																														queueContent:SC.ScrollView.design({
																										    					hasHorizontalScroller: NO,
																										    					layout: { top: 30, bottom: 30, left: 0, right:0},

																																	contentView:SC.ListView.design({
																														    		contentValueKey: "title",
																																		contentBinding: "Asprouttrailer.trailerPlayer.arrangedObjects",
																																		selectionBinding: "Asprouttrailer.trailerPlayer.selection",
																														  			rowHeight: 40,
																																		exampleView:Asprouttrailer.CustomQueue,
																																	//rowSpacing: 2,
																														    	})
																															})

																																}),
																								mouseDown: function(evt) {
																					
																								    var layout = this.get('layout');
																				
																								    this._mouseDownInfo = {
																								      pageX: evt.pageX, // save mouse pointer loc for later use
																								      pageY: evt.pageY,
																								      //left:  layout.left, // save layout info 
																								      //top: layout.top,
																											width:layout.width,
																											height:layout.height
																								    };
																										
																								    return YES; // so we get other events
																								  },
																									mouseUp: function(evt) {
																									    // apply one more time to set final position
																										
																									    return YES; // handled!
																									  },
																										mouseDragged: function(evt) {
																										    var info = this._mouseDownInfo,
																										        loc;
																	

																										    // handle X direction
																												if(info === undefined)
																												{
																													info = 100;
																												}
																												else{
																										    loc = info.width + (evt.pageX - info.pageX);
																										    this.adjust('width', loc);
																												pane.set('width', loc);
																												pane.width = loc;
																					
																										    // handle Y direction
																										    loc = info.height + (evt.pageY - info.pageY) ;
																										    this.adjust('height', loc);
																												pane.set('height', loc);
																												pane.height = loc;
																												}
																										
																							

																										    return YES ; // event was handled!
																										  },
																										
																			
																				});
																	  pane.popup(view, SC.PICKER_POINTER);
																	},
																		

													      }),
																trailersAdded: SC.LabelView.design({
																					classNames:['trailersAdded'],
																					controlSize: SC.LARGE_CONTROL_SIZE,
																			    //ontWeight: SC.BOLD_WEIGHT,
																			    layout: { right:10, top:0, height:20,width:20 },
																			    valueBinding:'Asprouttrailer.trailerPlayer.playQueue'
																			  	}),
		}),     
		//new york fade..
		fade:SC.View.design({
		    layout:{top:0,left:500,height:40,width:40},
				isVisibleBinding:'Asprouttrailer.nyMovieContent.nyShowInformation',
				mouseEntered: function(evt) {
									console.log('entering');
					        	Asprouttrailer.nyMovieContent.set('isShowingNyExit',true);
					        return YES
					    		},
								mouseExited: function(evt) {
										console.log('exiting');
										Asprouttrailer.nyMovieContent.set('isShowingNyExit',false);
				        		return YES
										},
		    childViews:'contents'.w(),
			
				contents:SC.View.design({
				childViews:'nySummary nyRating nyTitle nyImage nyExit nyHeadline nyPublicationDate nyRelatedUrl rightArrow leftArrow'.w(),
				
		    backgroundColor:'gray',
				
				nySummary:SC.LabelView.design({
							    layout: { bottom:0, height: 120, left:170, width: 308 },
                  escapeHTML: NO,
									isTextArea:YES,
							    isTextSelectable: YES,
							    valueBinding:'Asprouttrailer.nyMovieContent.summary_short'
							  	}),
									nyRating:SC.LabelView.design({
												    layout: { top:30, height: 30, left:170, width: 100 },
					                  escapeHTML: NO,
														isTextArea:YES,
												    isTextSelectable: YES,
												    valueBinding:'Asprouttrailer.nyMovieContent.mpaa_rating'
												  	}),
														nyTitle:SC.LabelView.design({
																	    layout: { top:10, height: 30, left:170, width: 240 },
										                  escapeHTML: NO,
																			isTextArea:YES,
																	    isTextSelectable: YES,
																	    valueBinding:'Asprouttrailer.nyMovieContent.display_title'
																	  	}),
																			nyHeadline:SC.LabelView.design({
																						    layout: { top:50, height: 30, left:170, width: 240 },
															                  escapeHTML: NO,
																								isTextArea:YES,
																						    isTextSelectable: YES,
																						    valueBinding:'Asprouttrailer.nyMovieContent.headline'
																						  	}),
																								nyImage:SC.ImageView.design({
																													layout: { left:5, top:0, height:220, width: 150 },
																													useImageQueue: NO, 
																													valueBinding:'Asprouttrailer.nyMovieContent.currentPoster'
																										    }),
																												nyPublicationDate:SC.LabelView.design({
																															    layout: { top:80, height: 30, left:170, width: 240 },
																								                  escapeHTML: NO,
																																	isTextArea:YES,
																															    isTextSelectable: YES,
																															    valueBinding:'Asprouttrailer.nyMovieContent.publication_date'
																															  	}),
																															nyRelatedUrl:SC.LabelView.design({
																																				    layout: { top:120, height: 30, left:170, width: 240 },
																													                  escapeHTML: NO,
																																						isTextArea:YES,
																																				    isTextSelectable: YES,
																																				    valueBinding:'Asprouttrailer.relatedURLController.url'
																																				  	}),
																																						leftArrow:SC.ImageView.design({
																																									classNames:['arrows'],
																																									layout: { left: 5, centerY:0, height:70, width: 60 },
																																									isVisibleBinding:'Asprouttrailer.nyMovieContent.isShowingNyExit',
																																									useImageQueue: NO, 
																																									value: '/static/asprouttrailer/en/54ff10622ae53a4c09031f2d66db998a7c60f415/source/resources/images/left.png',
																																									mouseDown: function(evt) {
																																										        this.parentView.parentView.animate('left',257,{duration:.3,timing:'ease-in-out'});
																																														this.parentView.parentView.animate('width',0,{duration:.3,timing:'ease-in-out'});
																																														
																																														Asprouttrailer.justAddedPage.mainPane.fadeTwo.animate('right',250,{duration:.3,timing:'ease-in-out'});
																																														
																																														
																																										        return YES
																																										    },
																																												mouseUp: function() {return YES },
																																						    }), 
																																								rightArrow:SC.ImageView.design({
																																										classNames:['arrows'],
																																										layout: { right: 5, centerY:0, height:70, width: 60 },
																																										isVisibleBinding:'Asprouttrailer.nyMovieContent.isShowingNyExit',
																																										useImageQueue: NO, 
																																										value: '/static/asprouttrailer/en/54ff10622ae53a4c09031f2d66db998a7c60f415/source/resources/images/right.png',
																																						    		}),
																									
												 														 							nyExit:SC.ButtonView.design({
												 														 									   		layout: { bottom: 20, height: 24, right: 12, width: 100 },
												 														 												isVisibleBinding:'Asprouttrailer.nyMovieContent.isShowingNyExit',
												 														 												title:  "Exit",
												 														 												target: "Asprouttrailer.statechart", 
												 														 												action: "nyExit",
												 														 												isDefault: YES
												 														 												}),
			                                               							
				
				//isVisibleBinding:'Asprouttrailer.trailerSelection.showFade',
			}),
		}),
		fadeTwo:SC.View.design({
		    layout:{top:200,right:-500,height:250,width:500},
				isVisibleBinding:'Asprouttrailer.nyMovieContent.nyShowInformation',
				mouseEntered: function(evt) {
									console.log('entering');
					        	Asprouttrailer.nyMovieContent.set('isShowingNyExit',true);
					        return YES
					    		},
								mouseExited: function(evt) {
										console.log('exiting');
										Asprouttrailer.nyMovieContent.set('isShowingNyExit',false);
				        		return YES
										},
		    childViews:'contents'.w(),
			
				contents:SC.View.design({
				childViews:'nySummary nyRating nyTitle nyImage nyExit nyHeadline nyPublicationDate nyRelatedUrl rightArrow leftArrow'.w(),
				
		    backgroundColor:'gray',
				
				nySummary:SC.LabelView.design({
							    layout: { bottom:0, height: 120, left:170, width: 308 },
                  escapeHTML: NO,
									isTextArea:YES,
							    isTextSelectable: YES,
							    valueBinding:'Asprouttrailer.nyMovieContent.summary_short'
							  	}),
									nyRating:SC.LabelView.design({
												    layout: { top:30, height: 30, left:170, width: 100 },
					                  escapeHTML: NO,
														isTextArea:YES,
												    isTextSelectable: YES,
												    valueBinding:'Asprouttrailer.nyMovieContent.mpaa_rating'
												  	}),
														nyTitle:SC.LabelView.design({
																	    layout: { top:10, height: 30, left:170, width: 240 },
										                  escapeHTML: NO,
																			isTextArea:YES,
																	    isTextSelectable: YES,
																	    valueBinding:'Asprouttrailer.nyMovieContent.display_title'
																	  	}),
																			nyHeadline:SC.LabelView.design({
																						    layout: { top:50, height: 30, left:170, width: 240 },
															                  escapeHTML: NO,
																								isTextArea:YES,
																						    isTextSelectable: YES,
																						    valueBinding:'Asprouttrailer.nyMovieContent.headline'
																						  	}),
																								nyImage:SC.ImageView.design({
																													layout: { left:5, top:0, height:220, width: 150 },
																													useImageQueue: NO, 
																													valueBinding:'Asprouttrailer.nyMovieContent.currentPoster'
																										    }),
																												nyPublicationDate:SC.LabelView.design({
																															    layout: { top:80, height: 30, left:170, width: 240 },
																								                  escapeHTML: NO,
																																	isTextArea:YES,
																															    isTextSelectable: YES,
																															    valueBinding:'Asprouttrailer.nyMovieContent.publication_date'
																															  	}),
																															nyRelatedUrl:SC.LabelView.design({
																																				    layout: { top:120, height: 30, left:170, width: 240 },
																													                  escapeHTML: NO,
																																						isTextArea:YES,
																																				    isTextSelectable: YES,
																																				    valueBinding:'Asprouttrailer.relatedURLController.url'
																																				  	}),
																																						leftArrow:SC.ImageView.design({
																																									classNames:['arrows'],
																																									layout: { left: 5, centerY:0, height:70, width: 60 },
																																									isVisibleBinding:'Asprouttrailer.nyMovieContent.isShowingNyExit',
																																									useImageQueue: NO, 
																																									value: '/static/asprouttrailer/en/54ff10622ae53a4c09031f2d66db998a7c60f415/source/resources/images/left.png',
																																									mouseDown: function(evt) {
																																										        this.parentView.parentView.animate('left',257,{duration:.3,timing:'ease-in-out'});
																																														this.parentView.parentView.animate('width',0,{duration:.3,timing:'ease-in-out'});
																																										        return YES
																																										    },
																																												mouseUp: function() {return YES },
																																						    }), 
																																								rightArrow:SC.ImageView.design({
																																										classNames:['arrows'],
																																										layout: { right: 5, centerY:0, height:70, width: 60 },
																																										isVisibleBinding:'Asprouttrailer.nyMovieContent.isShowingNyExit',
																																										useImageQueue: NO, 
																																										value: '/static/asprouttrailer/en/54ff10622ae53a4c09031f2d66db998a7c60f415/source/resources/images/right.png',
																																						    		}),
																									
												 														 							nyExit:SC.ButtonView.design({
												 														 									   		layout: { bottom: 20, height: 24, right: 12, width: 100 },
												 														 												isVisibleBinding:'Asprouttrailer.nyMovieContent.isShowingNyExit',
												 														 												title:  "Exit",
												 														 												target: "Asprouttrailer.statechart", 
												 														 												action: "nyExit",
												 														 												isDefault: YES
												 														 												}),
			                                               							
				
				//isVisibleBinding:'Asprouttrailer.trailerSelection.showFade',
			}),
		}),
		justAdded: SC.SplitView.design({	
		    	layout: { left: 0, top: 45, right: 0, bottom: 0 },
		      layoutDirection: SC.LAYOUT_HORIZONTAL,
		      autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
		      defaultThickness: 0.8,

		     topLeftView: SC.View.design({
		     	layout: { top: 45, bottom: 0, width: 200 },
		      childViews: 'nyTopBar newYorkTimes itunesTopBar itunesList searchField'.w(),
		
					nyTopBar:SC.ToolbarView.design({
					  layout: { top: 0, left: 0, right: 0, height: 45 },  
						backgroundColor:'black',
					  childViews:'title total nyLoading'.w(),
					title: 	SC.LabelView.design({
									    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
									    controlSize: SC.AUTO_CONTROL_SIZE,
									    fontWeight: SC.BOLD_WEIGHT,
						          escapeHTML: NO,
									    isTextSelectable: YES,
									    value:'New York Times	'
									  	}),
											total: SC.LabelView.design({
																	    layout: { centerY: 0, height: 24, right:40, width: 62 },
																			controlSize: SC.AUTO_CONTROL_SIZE,
																	    fontWeight: SC.BOLD_WEIGHT,
														          escapeHTML: NO,
																	    isTextSelectable: YES,
																			valueBinding:'Asprouttrailer.newYorkTimesController.summary'
																	  	}),
																			nyLoading:SC.LabelView.design({
																								isVisible:YES,
																						    layout: { centerY: 0, height: 24, right:40, width: 62 },
																						    controlSize: SC.AUTO_CONTROL_SIZE,
							                                	escapeHTML: NO,
																						    isTextSelectable: YES,
																						    value:"Loading..."
																						  	}),
																									}),

																								newYorkTimes: SC.ScrollView.design({
																															    hasHorizontalScroller: NO,
																															    layout: { top: 45, height:250, left: 0, right:0},
																																	scrollHeight: 1800,
																															contentView:SC.ListView.design({
																																scrollHeight: 1800,
																															contentValueKey: "display_title",
																															contentBinding: "Asprouttrailer.newYorkTimesController.arrangedObjects",
																															selectionBinding: "Asprouttrailer.newYorkTimesController.selection",
																															actOnSelect:YES,
																															//target:"Asprouttrailer.statechart",
																															action:"showPicker",
																															rowHeight: 40,
																															showPicker:function()	{Asprouttrailer.justAddedPage.mainPane.fade.animate('top',200,{duration:.5, timing:'ease-in-out'},this.invokeLater(this.showHeight,500));Asprouttrailer.statechart.sendEvent('checkSelection');Asprouttrailer.nyMovieContent.set('nyShowInformation',true);},													
																															showHeight:function() {Asprouttrailer.justAddedPage.mainPane.fade.animate('height',250,{duration:.5, timing:'ease-in-out'},this.invokeLater(this.showWidth,500));},
																															showWidth:function()  {Asprouttrailer.justAddedPage.mainPane.fade.animate('width',500,{duration:.5, timing:'ease-in-out'});}
																														})
																													}),
																													searchField:SC.TextFieldView.design({
																																	classNames:['searchField'],
																																	layout: { top: 295, left: 0, right: 0, height: 25 },
																																	controlSize: SC.LARGE_CONTROL_SIZE,
																																  hint: 'Search',
																																	valueBinding:'Asprouttrailer.leftListSearchResultsController.search',
																																	
																											            keyDown: function(evt) {
																											              arguments.callee.base.apply(this,arguments); // necessary to guarantee regular handling of keyDown events, 
																											                           // want to avoid that this overwrite messes everything up     	   
																											              if (evt.keyCode === 13) {
																											                // trigger the search after we've seen an "enter"
																											                Asprouttrailer.leftListSearchResultsController._updateSearchContent(); 
																																			//this.set('value','');
																																			this.animate('top',297,{duration:.3, timing:'ease-in-out'});
																																			this.animate('height',25,{duration:.3, timing:'ease-in-out'});
																											                return YES;
																											              } else {
																											                return NO;
																											              }
																											            }
																																}),
/*start of itunes bar left*/			itunesTopBar:	SC.ToolbarView.design({
																						classNames:['itunesTopBar'],
																						layout: { top: 295, left: 0, right: 0, height: 25 },  
																						childViews:'total summary itunesLoading search'.w(),
																				total: SC.LabelView.design({
																				    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
																				    controlSize: SC.AUTO_CONTROL_SIZE,
																				    fontWeight: SC.BOLD_WEIGHT,
																	          escapeHTML: NO,
																			    	isTextSelectable: YES,
																				    value:'Most Popular'
																				  	}),
																				summary:SC.LabelView.design({
																												    layout: { centerY: 0, height: 24, right:45, width: 62 },
																														controlSize: SC.AUTO_CONTROL_SIZE,
																												    fontWeight: SC.BOLD_WEIGHT,
																									          escapeHTML: NO,
																												    isTextSelectable: YES,
																														valueBinding:'Asprouttrailer.mostPopularController.summary'
																												  	}),
																												search:SC.ButtonView.design({
																														    layout: { centerY:0, height: 24, right: 2, width: 25 },
																														    title:  "S",
																																controlSize: SC.SMALL_CONTROL_SIZE,
																																//target: "ScCommunityMarketing.betaController",
																																action: "searching",
																																isDefault: NO,
																																searching:function()
																																{
																																	Asprouttrailer.justAddedPage.mainPane.justAdded.topLeftView.searchField.animate('top',320,{duration:.3, timing:'ease-in-out'});
																																	Asprouttrailer.justAddedPage.mainPane.justAdded.topLeftView.searchField.animate('height',40,{duration:.3, timing:'ease-in-out'});
																																	this.set('action','hideSearching');
																																},
																																hideSearching:function()
																																{
																																		Asprouttrailer.justAddedPage.mainPane.justAdded.topLeftView.searchField.animate('top',295,{duration:.3, timing:'ease-in-out'});
																																		Asprouttrailer.justAddedPage.mainPane.justAdded.topLeftView.searchField.animate('height',24,{duration:.3, timing:'ease-in-out'});
																																		this.set('action','searching');
																																}
																														      }),
																																	itunesLoading:SC.LabelView.design({
																																			isVisible:YES,
																													    				layout: { centerY: 0, height: 24, right:40, width: 62 },
																													    				controlSize: SC.AUTO_CONTROL_SIZE,
														                                					escapeHTML: NO,
																													    				isTextSelectable: YES,
																													    				value:"Loading..."
																													  				}),
																																	}),
																					itunesList: SC.ScrollView.design({
																												    hasHorizontalScroller: NO,
																												    layout: { top: 320, bottom:0, left: 0, right:0},
																														scrollHeight: 1800,
																												contentView:SC.ListView.design({
																														classNames: ['sc-list-item-view'],
																														contentValueKey: "title",
																														contentIconKey: "poster",
																														contentBinding: "Asprouttrailer.leftListResultsController.arrangedObjects",
																														selectionBinding: "Asprouttrailer.leftListResultsController.selection",
																														hasContentIcon:  YES,
																														exampleView:Asprouttrailer.TrailersListItemView,
																						                escapeHTML: NO,
																														actOnSelect:YES,
																														target:"Asprouttrailer.statechart",
																														action:"showiTunesReview",
																														rowHeight: 60,
																													})
																										}),
																										
										
						
		     }),//end of top left view

		//This is use so that no matter what that the signup image is always going to have a 400 max size
		 topLeftMaxThickness: 250,

		        //canCollapseViews: YES,
		        dividerView: SC.SplitDividerView.design({layout: {}}),

				//This is the right side of the site we can use this to keep switching out pages
		 bottomRightView:SC.ContainerView.design({

				contentView:SC.View.design({
				    layout:{top:0,bottom:0,right:0,left:0},
				    childViews:'itunesTrailers iTunesLoading'.w(),

						iTunesLoading: SC.LabelView.design({
											isVisible:YES,
									    layout: { centerY: 0, height: 40, centerX: 0, width: 300 },
									    controlSize: SC.LARGE_CONTROL_SIZE,
						          escapeHTML: NO,
									    isTextSelectable: YES,
									    value:"<h1>Loading...</>"
									  	}),
									
											itunesTrailers: SC.ScrollView.design({
						   						layout: { top: 0, bottom:0, left: 0, right:0},


														contentView:SC.GridView.design({
										 							classNames:['grid'],
										 							contentBinding: 'Asprouttrailer.moviesController.arrangedObjects',
				             							selectionBinding: 'Asprouttrailer.moviesController.selection',
				             							contentValueKey: "title",
				             							contentIconKey: "poster",
				             							exampleView: Asprouttrailer.CustomGrid,
				             							hasContentIcon:  YES,
				             							escapeHTML: NO,
				             							rowHeight: 270,
										 							columnWidth: 170,
										 							actOnSelect:YES,
										 							target:"Asprouttrailer.statechart",
										 							action:"viewTrailer",
										 							//touchStart: function(evt){  Asprouttrailer.statechart.sendEvent('viewTrailer'); return YES},
										 							//touchEnd: function(evt){ return YES},
                     							
										 							}),
										 								}),
										 									}),
				
				layout: { left:0, top:0, bottom:0, right:0 }
			}), 
		      }),
		
	})
});//end of page
/* >>>>>>>>>> BEGIN source/views/most_pop_grid.js */
//SC.LOG_OBSERVERS = YES;
//SC.LOG_BINDINGS = YES
var p = 0;
var i = 0;
Asprouttrailer.MostPopGrid = SC.ListView.extend({
	
	
	itemsPerRow: function() {
		var rowHeight = this.get('rowHeight');
		var frame =  this.get('frame');
   	var content = Asprouttrailer.mostPopularController.get('content');
		var totalContent = content.length;
		
		 var newWdith = frame.width += 1200;

    return totalContent ;
  }.property('totalContent').cacheable(),
  
  /** @private
    Find the contentIndexes to display in the passed rect. Note that we 
    ignore the width of the rect passed since we need to have a single
    contiguous range.
  */

  contentIndexesInRect: function(rect) {
    var rowHeight = this.get('rowHeight') || 48;
    var itemsPerRow = this.get('itemsPerRow');
    var min = Math.floor(SC.minY(rect) / rowHeight) * itemsPerRow;
    var max = Math.ceil(SC.maxY(rect) / rowHeight) * itemsPerRow ;
		
    return SC.IndexSet.create(min, max);
  },
  
  /** @private */
  layoutForContentIndex: function(contentIndex) {
    var rowHeight = this.get('rowHeight') || 48;
		var clippingFrame = this.get('clippingFrame');
		var f = this.get('frame');

		//frame.width += 100;
		
    var frameWidth = this.get('clippingFrame').width;

    var itemsPerRow = this.get('itemsPerRow');
		var columnWidth = Math.floor(frameWidth/itemsPerRow)*15;
    var row = Math.floor(contentIndex / itemsPerRow);
    var col = contentIndex - (itemsPerRow*row);
		
		console.log('this is a cal for width');
		

    return { 
      left: col * columnWidth,
      top: row * rowHeight,
      height: rowHeight,
      width: columnWidth,
    };
  },
	
	/** @private
    If the size of the clipping frame changes, all of the item views
	    on screen are potentially in the wrong position.  Update all of their
	    layouts if different.
	  */
	  _gv_clippingFrameDidChange: function() {
	    var nowShowing = this.get('nowShowing');
			var itemView;
			var idx;
			var len;

			this.notifyPropertyChange('itemsPerRow');
	
	    len = nowShowing.get('length');
			
	
	    for (idx=0; idx < len; idx++) {
	      itemView = this.itemViewForContentIndex(idx);
	      itemView.adjust(this.layoutForContentIndex(idx));
	    }
	
	  }.observes('clippingFrame'),
	
computeLayout: function() {
    var content = Asprouttrailer.mostPopularController.get('content');
    var count = (content) ? content.get('length') : 0;
    var rowHeight = this.get('rowHeight') || 48;
    var itemsPerRow = this.get('itemsPerRow');
    var rows = Math.ceil(count / itemsPerRow) ;

    // use this cached layout hash to avoid allocing memory...
    var ret = this._cachedLayoutHash ;
		console.log('this is cachedLayoutHash');
		console.log(ret);
    if (!ret) ret = this._cachedLayoutHash = {};

		
    
    // set minHeight
    ret.minHeight = rows * rowHeight ;
		console.log('return min height');
		console.log(ret.minHeight);
    this.calculatedHeight = ret.minHeight;
		console.log('return calculatedHeight');
		console.log(this.calculatedHeight)
    return ret; 
  },


}) ;
/* >>>>>>>>>> BEGIN source/views/custom_scroller.js */
Asprouttrailer.CustomScroller = SC.ScrollView.extend({
	

	
	horizontalScrollOffset: function(key, value) {
   if (value !== undefined) {
     var minOffset = this.minimumHorizontalScrollOffset(),
         maxOffset = this.get('maximumHorizontalScrollOffset');
     this._scroll_horizontalScrollOffset = Math.max(minOffset,Math.min(maxOffset, value)) ;
   }

   return this._scroll_horizontalScrollOffset||0;
 }.property().cacheable(),


maximumScrollOffset: function(contentSize, containerSize, align) {

				console.log('this is contentSize = 176'); 
				console.log('this is containerSize = 176'); 
     // if our content size is larger than or the same size as the container, it's quite
     // simple to calculate the answer. Otherwise, we need to do some fancy-pants
     // alignment logic (read: simple math)
			
     if (contentSize >= containerSize) return contentSize - containerSize;
     
     // alignment, yeah
     if (align === SC.ALIGN_LEFT || align === SC.ALIGN_TOP) {
       // if we left-align something, and it is smaller than the view, does that not mean
       // that it's maximum (and minimum) offset is 0, because it should be positioned at 0?
       return 0;
     } else if (align === SC.ALIGN_MIDDLE || align === SC.ALIGN_CENTER) {
       // middle align means the difference divided by two, because we want equal parts on each side.
       return 0 - Math.round((containerSize - contentSize) / 2);
     } else {
       // right align means the entire difference, because we want all that space on the left
       return 0 - (containerSize - contentSize);
     }
   },
   
   /**
     @private
     Calculates the minimum offset given content and container sizes, and the
     alignment.
   */
   minimumScrollOffset: function(contentSize, containerSize, align) {
     // if the content is larger than the container, we have no need to change the minimum
     // away from the natural 0 position.

     if (contentSize > containerSize) return 0;
     
     // alignment, yeah
     if (align === SC.ALIGN_LEFT || align === SC.ALIGN_TOP) {
       // if we left-align something, and it is smaller than the view, does that not mean
       // that it's maximum (and minimum) offset is 0, because it should be positioned at 0?
       return 0;
     } else if (align === SC.ALIGN_MIDDLE || align === SC.ALIGN_CENTER) {
       // middle align means the difference divided by two, because we want equal parts on each side.
       return 0 - Math.round((containerSize - contentSize) / 2);
     } else {
       // right align means the entire difference, because we want all that space on the left
       return 0 - (containerSize - contentSize);
     }
   },



maximumHorizontalScrollOffset: function() {
   var view = this.get('contentView');
			console.log(view);
   var contentWidth = 0;
		var calculatedWidth = 0;


       
   if (view && view.get('frame')) contentWidth = view.get('frame').width;
   if (view) calculatedWidth = view.calculatedWidth || 0;
   
   // The following code checks if there is a calculatedWidth (collections)
   // to avoid looking at the incorrect value calculated by frame.
   if(view && view.calculatedWidth && view.calculatedWidth!==0){
     contentWidth = view.calculatedWidth; 
   }
   contentWidth *= this._scale;
		console.log('this is content width');
				console.log(contentWidth);
				
   contentWidth += 400;
		console.log('this is content width');
				console.log(contentWidth);
   var containerWidth = this.get('containerView').get('frame').width ;
	
   containerWidth += 400;
	console.log(containerWidth);
   // we still must go through minimumScrollOffset even if we can't scroll
   // because we need to adjust for alignment. So, just make sure it won't allow scrolling.
   if (!this.get('canScrollHorizontal')) contentWidth = Math.min(contentWidth, containerWidth);
   return this.maximumScrollOffset(contentWidth, containerWidth, this.get("horizontalAlign"));
 }.property(),

	

	
});
/* >>>>>>>>>> BEGIN source/resources/most_popular.js */
sc_require('views/most_pop_grid.js');
sc_require('views/custom_scroller.js');
Asprouttrailer.mostPopularPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'navigationBar mostPopular'.w(),

		defaultResponder: Asprouttrailer.statechart,
		
		navigationBar: SC.ToolbarView.design({
		  layout: { top: 0, left: 0, right: 0, height: 45 },  
			  childViews:'justAdded mostPopular'.w(),
			justAdded: SC.LabelView.design({
							    layout: { centerY: 0, height: 24, left:40, width: 80 },
				          escapeHTML: NO,
							    //isTextSelectable: YES,
							    value:"Just Added",
									mouseEntered: function(evt) {this.animate('scale',1.5,{duration:.3, timing:'ease-in-out'});return YES},
									mouseExited: function() {this.animate('scale',1,{duration:.3, timing:'ease-in-out'});return YES	},
									mouseDown: function(evt) { Asprouttrailer.statechart.sendEvent('justAdded');return YES },
									mouseUp: function() { return YES},
									touchStart: function(evt){  Asprouttrailer.statechart.sendEvent('justAdded'); return YES},
									touchEnd: function(evt){ return YES},
								}),
			 mostPopular: SC.LabelView.design({
			 				    layout: { centerY: 0, height: 24, left:180, width: 80 },
			 	          escapeHTML: NO,
			 				    //isTextSelectable: YES,
			 				    value:"Most Popular",
									mouseEntered: function(evt) {this.animate('scale',1.5,{duration:.3, timing:'ease-in-out'});return YES},
									mouseExited: function() {this.animate('scale',1,{duration:.3, timing:'ease-in-out'});return YES	},
									mouseDown: function(evt) { Asprouttrailer.statechart.sendEvent('mostPopular');return YES },
									mouseUp: function() { return YES},
									touchStart: function(evt){  Asprouttrailer.statechart.sendEvent('mostPopular'); return YES},
									touchEnd: function(evt){ return YES},
							}),
		}),
		mostPopular:SC.ScrollView.design({
						  alwaysBounceVertical: NO,
							autohidesHorizontalScroller: NO,
							hasVerticalScroller: NO,
							borderStyle: SC.BORDER_NONE,
				    	layout: { top:45, height: 300, left: 0, right:0},

						contentView:SC.View.design({
						    layout:{top:0,bottom:0,width:18020,left:0},
								childViews:'contentView'.w(),
	
		        			contentView: Asprouttrailer.MostPopGrid.design({
										classNames:['grid'],
	 									contentBinding: 'Asprouttrailer.mostPopularController.arrangedObjects',
   									selectionBinding: 'Asprouttrailer.mostPopularController.selection',
   									contentValueKey: "title",
   									contentIconKey: "poster",
   									exampleView: Asprouttrailer.CustomGrid,
   									hasContentIcon:  YES,
   									escapeHTML: NO,
   									rowHeight: 270,
	 									columnWidth: 170,
										borderStyle: SC.BORDER_NONE, 
											}),
					})
			})
	})
});//end of page
/* >>>>>>>>>> BEGIN source/resources/queue.js */
Asprouttrailer.Queue = [


];

/* >>>>>>>>>> BEGIN source/resources/states.js */
SC.mixin(Asprouttrailer, {
  
  statechart: Ki.Statechart.create({

    rootState: Ki.State.design({

      initialSubstate: 'Enter',

      Enter: Ki.State.design({

        enterState: function() {
					this.callingNewYorkTimes();
					this.callingMostPopular();
					this.gotoState('JustAdded');	
					
        },
				callingNewYorkTimes:function()
				{
					console.log("Calling New York Times...");
					var resultsQuery = SC.Query.remote(Asprouttrailer.NewYorkTimes, {query: this.get('results')});
					console.log(resultsQuery);
					var results = Asprouttrailer.storeC.find(resultsQuery);
					console.log(results);
					Asprouttrailer.newYorkTimesController.set('content', results);				
				},
				callingMostPopular:function()
				{
					
				}
			}), // end of the foo
			

			
	//New State...Landing State		
	JustAdded: Ki.State.design({
		
		initialSubstate: 'Loading',
	
	Loading: Ki.State.design({

    enterState: function() {
				console.log('Just Added...');
				Asprouttrailer.getPath('justAddedPage.mainPane').append();				
				this.setExtraLargePoster();
    },
		mostPopular: function()
		{
			this.gotoState('MostPopular');			
		},
		viewTrailer: function()
		{
			this.gotoState('ShowingMovie');
		},
		exitState: function ()
		{
			Asprouttrailer.getPath('justAddedPage.mainPane').remove();
		}
	}), // end of the most JustAdded
}),
/********************************************************************Just Added*************************************/
	JustAdded: Ki.State.design({
		
		initialSubstate: 'Loading',
	
	Loading: Ki.State.design({

    enterState: function() {
				console.log('Just Added...');
				Asprouttrailer.getPath('justAddedPage.mainPane').append();
			},
		mostPopular: function()
		{
			this.gotoState('MostPopular');	
		},
		nyExit: function()
		{
			Asprouttrailer.nyMovieContent.set('nyShowInformation',false);
		},
		searchResultsPopup:function(view)
		{
			var pane = SC.PickerPane.create({
	     layout: { width: 400, height: 200 },
	
				contentView: SC.ScrollView.design({
						    hasHorizontalScroller: NO,
						    layout: { top: 10, bottom: 10, left: 5, right:5},

								contentView:SC.ListView.design({
										    	contentValueKey: "title",
													contentBinding: "Asprouttrailer.searchResultsController.arrangedObjects",
													selectionBinding: "Asprouttrailer.searchResultsController.selection",
										      rowHeight: 40,
													rowSpacing: 2,
										    	})
												}),
	
	    }).popup(view, SC.PICKER_MENU);	
		},
		customPlayer:function()
		{
			console.log('customer player...');
		
			var tmpTitle = Asprouttrailer.trailerPlayerSelection.get('title');
			var tmplocation = Asprouttrailer.trailerPlayerSelection.get('location');
			var poster = Asprouttrailer.trailerPlayerSelection.get('poster');
			var studio = Asprouttrailer.trailerPlayerSelection.get('studio');
			
			console.log(studio);
			var all = studio.toLowerCase().split(' ').join('_');
			console.log(all);
			
			var backgroundImage = poster.replace("/poster","/background");
			
			Asprouttrailer.trailerPlayerSelection.set('customBackgroundImage',backgroundImage);

			var title = tmpTitle.toLowerCase().split(' ').join('').replace('ii',2).replace('part2',2);
			var location = tmplocation.replace("/trailers","");

			var removeLabel = "/" + title + "/" + title;

			var movieString = location + title;

			//moviewURL.toString();
			 //moviewURL.replace("/trailers", "");
				var movie = "<video " + "id=sproutPlayer" + " controls='controls' class='video' x-webkit-airplay='allow' width='640' height='272' " + poster +' autoplay="autoplay" bgcolor="black">'+ 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'</video>';
				
				
				var count = Asprouttrailer.trailerPlayer.get('content');
				var m = count.get('length');
	
				
				var curSelection = Asprouttrailer.trailerPlayer.get('selection');
				
				var num = curSelection.get('length');
			//	curSelection.objectAt(m);
				var newCommittee = count.toArray();
				var ne = newCommittee.indexOf(curSelection); 
				

				
			Asprouttrailer.trailerPlayerSelection.set('currentTrailerPlaying',movie);
			
			
		},
		itunesMostPopularSearch:function()
		{
			//first get the search data...
			var content = Asprouttrailer.mostPopularController.get("content");
			var searching = Asprouttrailer.mostPopularController.get("mostPopularSearch");
			Asprouttrailer.mostPopularController.set("mostPopularSearch",''); //remove what we enter for query
			
			var set = SC.Set.create(content);
	
					
			set.get('isEnumerable');
			

			
			set.findProperty('title',searching);
			
			var m = set.getEach('title');
			

			var result = set.findProperty('title',searching);
			
			Asprouttrailer.mostPopularController.set('content',result);
			
			//Asprouttrailer.justAddedPage.mainPane.justAdded.topLeftView.itunesList.contentView.set('contentBinding','Asprouttrailer.mostPopularResults.arrangedObjects');
			
			//console.log(set);

			//console.log(tmp);
			
		},
		showiTunesReview:function()
		{
			console.log('show');
			Asprouttrailer.moviesController.set('showiTunesreview',true);
			
			var posterImages = Asprouttrailer.leftListResultsSelectionController.get('poster');
			var movieLink = Asprouttrailer.leftListResultsSelectionController.get('moviesite');
			//movieLink.toString();
			
			console.log(posterImages);
			console.log(movieLink);
			
			if(movieLink === undefined)
			{
				Asprouttrailer.leftListSearchResultsController.set('movieWebSite','');
				movieLink = '';
			}
			else{
			movieLink.replace("com/"," ");
			console.log(movieLink);
			
		
			var movieWebSite = '<a href='+ movieLink +'>' + movieLink;
			
			console.log(movieWebSite);
			
			Asprouttrailer.leftListSearchResultsController.set('movieWebSite',movieWebSite);
			};

		
			console.log(posterImages);
			
			//http://trailers.apple.com/trailers/paramount/thor/images/background.jpg
			
			//trailers.apple.com/trailers/paramount/thor/images/poster.jpg
			//trailers.apple.com/trailers/paramount/thor/images/poster-xlarge.jpg
			
			var backgroundImage = posterImages.replace("/poster","/background");
			
			var xLargeImage = posterImages.replace("/poster","/poster-xlarge");
			
			console.log(xLargeImage);
			console.log(backgroundImage);
			
			//setting extra Large Image
			Asprouttrailer.leftListResultsSelectionController.set('extraLargeImage',xLargeImage);
			
			//backgroundImage for Trailer
			Asprouttrailer.leftListResultsSelectionController.set('backgroundTrailerImage',backgroundImage);
			
			//Start animation for description of movie
			this.invokeLater(this.trailerAnimation,500);
		},
		trailerAnimation:function()
		{
			Asprouttrailer.justAddedPage.mainPane.itunesReview.detail.studio.animate('right',0.65,{duration:.9, timing:'ease-in-out'},this.invokeLater(this.slideInPlace,500));       
			Asprouttrailer.justAddedPage.mainPane.itunesReview.detail.directors.animate('right',0.74,{duration:.8, timing:'ease-in-out'});
			Asprouttrailer.justAddedPage.mainPane.itunesReview.detail.moviesite.animate('right',0.65,{duration:.7, timing:'ease-in-out'});
			Asprouttrailer.justAddedPage.mainPane.itunesReview.detail.genre.animate('right',0.65,{duration:1, timing:'ease-in-out'},this.invokeLater(this.slideInPlace,500));
			Asprouttrailer.justAddedPage.mainPane.itunesReview.detail.actors.animate('right',0.65,{duration:.9, timing:'ease-in-out'});
		},
		slideInPlace:function()
		{
			Asprouttrailer.justAddedPage.mainPane.itunesReview.detail.genre.animate('top',95,{duration:.6, timing:'ease-in-out'});
			Asprouttrailer.justAddedPage.mainPane.itunesReview.detail.studio.animate('top',115,{duration:.6, timing:'ease-in-out'});
		},

		showSearchTrailer: function()
		{
			
				//console.log('you are watching a trailer....');
				var tmpTitle = Asprouttrailer.moviesSearchController.get('title');
				var tmplocation = Asprouttrailer.moviesSearchController.get('location');
				var poster = Asprouttrailer.moviesSearchController.get('poster');
					
				var title = tmpTitle.toLowerCase().split(' ').join('').replace('ii',2).replace('part2',2);
				
				
				var location = tmplocation.replace("/trailers","");

				var removeLabel = "/" + title + "/" + title;

				var movieString = location + title;
				
					var movie = "<video " + "id=sproutPlayer"+ " poster=" + poster + " controls='controls' class='video' x-webkit-airplay='allow' width='640' height='272' " + poster +' autoplay="autoplay" bgcolor="black">'+ 
					'<source src="http://trailers.apple.com/movies' + movieString +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
					'<source src="http://trailers.apple.com/movies' + movieString +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
					'<source src="http://trailers.apple.com/movies' + movieString +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
					'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
					'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
					'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
					'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
					'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
					'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
					'</video>';
					//console.log(movie);
					Asprouttrailer.moviesSearchController.set('showSearchTrailer',movie);
				
		},
		fade:function()
		{
			Asprouttrailer.justAddedPage.mainPane.black.animate('opacity',.8,{duration:1.5, timing:'ease-in-out'});
		},
		viewTrailer: function(view)
		{
			Asprouttrailer.moviesController.set('showFade',true);
			this.invokeLater(this.fade,1100);
			
			//console.log('you are watching a trailer....');
			var tmpTitle = Asprouttrailer.trailerSelection.get('title');
			var tmplocation = Asprouttrailer.trailerSelection.get('location');
			var poster = Asprouttrailer.trailerSelection.get('poster');
			var studio = Asprouttrailer.trailerSelection.get('studio');
			
			console.log(studio);
			var newStudio = studio.toLowerCase().split(' ').join('_');
			console.log(newStudio);
			
			var title = tmpTitle.toLowerCase().split(' ').join('').replace('ii',2).replace('part2',2);
			var location = tmplocation.replace("/trailers","");

			var removeLabel = "/" + title + "/" + title;

			var movieString = location + title;


			console.log(newStudio + removeLabel);
			SC.debug(newStudio + removeLabel);
			//console.log(movieString);

			//moviewURL.toString();
			 //moviewURL.replace("/trailers", "");
				var movie = "<video " + "id=sproutPlayer"+ " poster=" + poster + " controls='controls' class='video' x-webkit-airplay='allow' width='640' height='272' " + poster +' autoplay="autoplay" bgcolor="black">'+ 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/'+ newStudio  + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/'+ newStudio  + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/'+ newStudio  + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'</video>';
				//console.log(movie);
				Asprouttrailer.trailerSelection.set('trailer',movie);


				//this.invokeLater(this.checkingDuration, 1200);
				/*
				var timer = SC.Timer.schedule({
												target: this, 
												action: 'checkingDuration', 
												interval: 500,
												repeats: YES,
												isPaused: NO,

											});
											*/



	    var pane = SC.PickerPane.create({
	      layout: { top: 100, left:300,width: 640,height: 272},
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
				contentView:SC.View.design({
							    layout:{top:0,bottom:0,right:0,left:0},
							    childViews:'movie exit'.w(),
										mouseEntered: function(evt) {
											        Asprouttrailer.trailerPlayerSelection.set('showExit',true);
											        return YES
											    },
													mouseExited: function() {
														 Asprouttrailer.trailerPlayerSelection.set('showExit',false);
										        return YES
														},
								exit:SC.ImageView.design({
												//classNames:['sprout'],
												isVisibleBinding:'Asprouttrailer.trailerPlayerSelection.showExit',
												layout: { top: 0, left:0, height:30, width: 30 },
												useImageQueue: NO, 
												value: '/static/asprouttrailer/en/54ff10622ae53a4c09031f2d66db998a7c60f415/source/resources/images/close_button.png',
												mouseDown: function(evt) {
													        pane.remove();
																	Asprouttrailer.justAddedPage.mainPane.black.animate('opacity',0,{duration:1, timing:'ease-in-out'});
													        this.invokeLater(this.fadeOff,1000);
																	return YES
													    },
															mouseUp: function() { return YES},
																fadeOff:function()
																{
																	Asprouttrailer.moviesController.set('showFade',false);
																},
									    	}),		
											movie:SC.LabelView.design({
							    				//layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
				          				escapeHTML: NO,
							    				valueBinding:'Asprouttrailer.trailerSelection.trailer',
							  					}),
												}),
	    });
	    pane.popup(view, SC.PICKER_MENU);
			

		},		
		takeOut:function()
		{
			Asprouttrailer.moviesController.set('showFade',false);
		},
		checkSelection:function()
		{
			var tmp = Asprouttrailer.justAddedPage.mainPane.justAdded.topLeftView.newYorkTimes.contentView.get('selection');
		var tmp2 = Asprouttrailer.nyMovieContent.get('display_title');
		var tmp3 = Asprouttrailer.moviesController.get('content');
				//Asprouttrailer.moviesController.find()
				var set = SC.Set.create(tmp3);
				set.get('isEnumerable');
				set.findProperty('title',tmp2);
				var tmp4 = set.findProperty('title',tmp2);
				
				
		
			console.log(tmp);
			console.log(set);
			console.log(tmp2);
			console.log(tmp4);
			
			
			if(tmp4 === null)
			{
				Asprouttrailer.nyMovieContent.set('currentPoster','No Poster Avaiable');
				
			}else
			{
				Asprouttrailer.nyMovieContent.set('currentPoster',tmp4.poster);
			}

		},
		exitState: function ()
		{
			Asprouttrailer.getPath('justAddedPage.mainPane').remove();
		}
	}), // end of the most JustAdded
}),
/********************************************************************Searching Movies*************************************/

SearchMovie: Ki.State.design({
	
	initialSubstate: 'Searching',

Searching: Ki.State.design({

  enterState: function() {
			//console.log('Just Added...');
			Asprouttrailer.getPath('justAddedPage.mainPane').append();

  },
	showSearchTrailer: function()
	{
		
	},
	mostPopular: function()
	{
		this.gotoState('MostPopular');
		
	},
	viewTrailer: function()
	{
		this.gotoState('ShowingMovie');
	},
	
	exitState: function ()
	{
		Asprouttrailer.getPath('justAddedPage.mainPane').remove();
	}
}), // end of the most JustAdded
}),
/********************************************************************Most Popular*************************************/
MostPopular: Ki.State.design({
	
	initialSubstate: 'Loading',

Loading: Ki.State.design({

  enterState: function() {
			console.log('Most Popular...');
			Asprouttrailer.getPath('mostPopularPage.mainPane').append();
			//Asprouttrailer.getPath('justAddedPage.mainPane').append();

  },
	justAdded: function()
	{
		this.gotoState('JustAdded');
		
	},
	viewTrailer: function()
	{
		this.showingTrailer();
	},
	showingTrailer: function(view)
	{
		//console.log('you are watching a trailer....');
		var tmpTitle = Asprouttrailer.mostPopularSelection.get('title');
		var tmplocation = Asprouttrailer.mostPopularSelection.get('location');
		var poster = Asprouttrailer.mostPopularSelection.get('poster');
		
		var title = tmpTitle.toLowerCase().split(' ').join('');
		var location = tmplocation.replace("/trailers","");
		
	
		
		var removeLabel = "/" + title + "/" + title;
		
		var movieString = location + title;
		
			//console.log(removeLabel);
			//console.log(movieString);

			//moviewURL.toString();
			 //moviewURL.replace("/trailers", "");
				var movie = "<video " + "id=sproutPlayer"+ " poster=" + poster + " controls='controls' class='video' x-webkit-airplay='allow' width='640' height='272' " + poster +' autoplay="autoplay" bgcolor="black">'+ 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies' + movieString +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/lionsgate' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr1_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr2_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' + 
				'<source src="http://trailers.apple.com/movies/independent' + removeLabel +'-tlr3_r640s.mov?width=640&amp;height=272' + ' type="video/mp4">' +
				'</video>';
				//console.log(movie);
				Asprouttrailer.mostPopularSelection.set('trailer',movie);


				//this.invokeLater(this.checkingDuration, 1200);
				/*
				var timer = SC.Timer.schedule({
												target: this, 
												action: 'checkingDuration', 
												interval: 500,
												repeats: YES,
												isPaused: NO,

											});
											*/


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
							    valueBinding:'Asprouttrailer.mostPopularSelection.trailer',
							  	}),
	    });
	    pane.popup(view, SC.PICKER_MENU);

		},
	checkingDuration: function()
	{
		//var table = document.getElementById("sproutPlayer");sc1587
		//var timeUpdate = table.currentTime;
		var tmp = SC.Object.create({
			//var table = document.getElementById("sproutPlayer");
			//return YES;
		});
		tmp = document.getElementById("sproutPlayer");
		
		//console.log(tmp.currentTime);
		//console.log(table);
		//console.log(timeUpdate);
		//console.log(table.ended);
		//Asprouttrailer.trailerSelection.preferenceDidChange;
		//Asprouttrailer.trailerSelection.set('currentTime',timeUpdate);
	},
	exitState: function ()
	{
		Asprouttrailer.getPath('mostPopularPage.mainPane').remove();
	}
}), // end of the foo
}),//end of most popular

ShowingMovie: Ki.State.design({
	
	initialSubstate: 'Showing',

Showing: Ki.State.design({

  enterState: function() {
			console.log('Showing Movie Trailer...');
				Asprouttrailer.getPath('justAddedPage.mainPane').append();
			this.showingTrailer();

  },
	mostPopular: function()
	{
		this.gotoState('MostPopular');
		
	},
	justAdded: function()
	{
		this.gotoState('JustAdded');
		
	},

	checkingDuration: function()
	{
		//console.log('timer');
		var table = document.getElementById("sproutPlayer");
		var timeUpdate = table.currentTime;
		var endOfTrailer = table.ended;
		var tmp = SC.Object.create({
			//var table = document.getElementById("sproutPlayer");
			//return YES;
		});
		tmp = document.getElementById("sproutPlayer");
		
		
		
		//console.log(tmp.currentTime);
		//console.log(tmp.ended);
		//console.log(table);
		//console.log(timeUpdate);
		//console.log(table.ended);
		//Asprouttrailer.trailerSelection.preferenceDidChange;
		Asprouttrailer.trailerSelection.set('currentTime',timeUpdate);
		if(endOfTrailer === true)
		{
			//console.log('we are at the end');
			timer.set('isPaused', YES) ;
		}
	},
	exitState: function ()
	{
		Asprouttrailer.getPath('justAddedPage.mainPane').remove();
	}
}), // end of the most JustAdded
}),




    })
  
  })

});

/* >>>>>>>>>> BEGIN source/views/popView.js */
// ==========================================================================
// Project:   ScNpr.PageView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ScNpr */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Asprouttrailer.PageView = SC.View.extend({

  containerView: null,
  contentView: null,
  outerContentView: null,
  content: null,
  _rendered: false,


  createChildViews: function() {
    var childViews = [] , view; 

    // create the containerView.  We must always have a container view. 
    // also, setup the contentView as the child of the containerView...
    if (SC.none(view = this.containerView)) view = SC.View;

    childViews.push(this.containerView = this.createChildView(view, {
      layout: {top:0,left:0, bottom:0, width:1024}
    }));


    // and replace our own contentView...
    var f = this.containerView.get('frame');
     f.y = 0;
    //this.outerContentView.set('frame',f);

     console.log(f);

    // set childViews array.
    this.childViews = childViews ;

    // this.contentViewDidChange() ; // setup initial display...
  },
	contentViewDidChange: function() {
	    var newView = this.get('containerView'),
	        oldView = this._scroll_contentView,
	        frameObserver = this.contentViewFrameDidChange,
	        layerObserver = this.contentViewLayerDidChange;
	
				console.log(newView);
				console.log(oldView);
				console.log(frameObserver);
				console.log(layerObserver);
				
				

	    if (newView !== oldView) {

	      // stop observing old content view
	      if (oldView) {
	        oldView.removeObserver('frame', this, frameObserver);
	        oldView.removeObserver('layer', this, layerObserver);
	      }

	      // update cache
	      this._scroll_contentView = newView;
	      if (newView) {
	        newView.addObserver('frame', this, frameObserver);
	        newView.addObserver('layer', this, layerObserver);
	      }

	      // replace container
	      this.containerView.set('contentView', newView);

	      this.contentViewFrameDidChange();
	    }
	  }.observes('contentView'), 
	
	startingIndex: 0,
	
	updateLayerToProperOffset: function() {
	    var curItem = Asprouttrailer.mostPopularController.get('startingIndex');
	    this._state = curItem;
	    var dest = (curItem * this.objectWidth);
	    this._curVal = -1 * dest;
	//     console.log('translate3d(-'+dest+'px,0px,0px)');
	    this.containerView.$().css('-webkit-transform','translate3d(-'+dest+'px,0px,0px)');
	  },
	
	  contentBinding: 'Asprouttrailer.mostPopularController*activeController.arrangedObjects',
	
		contentObserver: function() {
		    // if(this._rendered) return;
		    var children = [], view;


		    var stories = this.get('content');
		
		    console.log("stories = "+stories);
		    if(!stories) return;

		    var len = stories.length();
		    console.log("len = "+len);
		    if(!len) return;
		    this._rendered = true;
		    this.set('numObjects',len); //This might be where it will error out 

		    var objectWidth = 1024;
		    var _cv = this.get('contentView');


		    view = _cv;
		    var outerCV = this.get('containerView');
		    this._layer = outerCV.get('layer');
		    // console.log("view = "+view);
		    // console.log("outerCV = "+outerCV);
		    // console.log("outerCV.frame.y = "+outerCV.frame.y);
		    outerCV.adjust('width',len * objectWidth);    
		    this.clearContents();
		    var v = null;
		    for (var i = len - 1; i >= 0; i--){
		      // console.log("stories.objectAt(i) = "+stories.objectAt(i));
		      v = view.create({
		        layout : {top:0,left:(i * objectWidth),bottom:0,width:objectWidth},
		        //classNames: 'story-in-detail'.w(),
		        parentView: outerCV,
		        owner: outerCV,
		        isVisibleInWindow: true,
		        page: outerCV.page
		      });
		      v.set('content',stories.objectAt(i));
		      outerCV.appendChild(v);
		      //        
		      // outerCV.childViews.push(outerCV.createChildView(view, {
		      //   layout : {top:0,left:(i * objectWidth),bottom:0,width:objectWidth},
		      //   classNames: 'story-in-detail'.w(),
		      //   content: stories.objectAt(i)
		      // }));

		      // console.log("outerCV.childViews = "+outerCV.childViews);
		    }
		  }.observes('*content.[]'),
		
			clearContents: function() {
			    var cv = this.get('containerView');
			    // console.log("cv = "+cv.get('childViews'));
			    var images = this.$('img');
			    var len = images.length;
			    for (var i = images.length - 1; i >= 0; i--){
			      console.log("Clearning images[i].src to "+images[i].src);
			      //images[i].src = "";
			    }
			    cv.removeAllChildren();
			  },
			
			
			  _touchObject: null,
			  _originalPoint: null,
			  _state: 0,

			   acceptsMultitouch: YES,

			  numObjects: 2,
			  objectWidth:1024,
			  _numObjectsPerPage: 1,
			  _dragCoefficient: 3,
			  _movingThreshold: 10,

			  _accumulatedDifference: 0,//SC.Point.create(),
			  _originalLeft:0,
			  _layer: null,

			  storyIsVisibleObserver: function(){
			    var val = ScNpr.storyController.get('storyIsVisible');
			    this.$().css('z-index',(val)? '2' : '0');
			  }.observes('storyIsVisible'),
			
				captureTouch: function(touch) {
				    return YES;
				  },

				  touchStart: function(evt) {
				    // console.log("touchStart");
				    var cv = this.get('containerView');

				    this._touchObject = evt;
				    this._originalLeft = cv.get('layout').left;

				    this._originalPoint = SC.Point.create({
				      x:evt.pageX,
				      y:evt.pageY
				    });

				    return YES;
				  },
				
				 _draggingMode: 0,
				  slopeCutoff: 0.4,
				  // slopeCutoffBinding: 'SproutFeeds.customizationController.slopeSlider',

				  touchesDragged: function(evt,touches) {
				    var differenceX = (evt.pageX - this._originalPoint.x);
				    var differenceY = (evt.pageY - this._originalPoint.y);

				    console.log("wrapper touchesDragged with differenceY = "+differenceY);

				    var state = this._state;

				    if(state === 0 && differenceX > 0){
				      differenceX /= this._dragCoefficient;
				    }
				    else if(state === (this.numObjects-this._numObjectsPerPage) && differenceX < 0){
				      differenceX /= this._dragCoefficient;
				    }        
				    this._accumulatedDifference.x += differenceX;
				    this._accumulatedDifference.y += differenceY;

				    var distance = Math.sqrt(Math.pow(this._accumulatedDifference.x,2)+Math.pow(this._accumulatedDifference.y,2));

				    var slope = Math.abs(this._accumulatedDifference.y) / Math.abs(this._accumulatedDifference.x);

				    // console.log("slope = "+slope);
				    // console.log("slope = "+slope);
				    // console.log("slopCutoff = "+this.get('slopeCutoff'));

				    switch(this._draggingMode){
				      case 0:
				        if(distance > this._movingThreshold && slope >= this.get('slopeCutoff')){
				          this._draggingMode = 1;

				          console.log("releasing touch to scrollview");

				          this._accumulatedDifference.x = 0;
				          this._accumulatedDifference.y = 0;
				          this._draggingMode = 0;
				          console.log(touches.get('length'));
				          touches.forEach(function(o){o.captureTouch(this, YES); },this);
				        } else if(distance > this._movingThreshold && slope < this.get('slopeCutoff')){
				          this._draggingMode = 2;
				          this._layer.style.WebkitTransform = 'translate3d('+(this._curVal+differenceX)+'px,0px,0px)';  
				          console.log("scrolling horizontally");
				        }  
				      break;
				      case 2:
				        this._layer.style.WebkitTransform = 'translate3d('+(this._curVal+differenceX)+'px,0px,0px)';  
				      break;
				    }

				  },

				  enableAnimations: function() {
				      this._layer.style.WebkitTransition = '-webkit-transform 0.2s ease-out';
				  },
				  disableAnimations: function() {
				      this._layer.style.WebkitTransition = '-webkit-transform 0.0s ease-out';
				  },

				  mouseDown: function(evt) {
				    this.touchStart(evt);
				  },

				  mouseDragged: function(evt) {
				    this.touchesDragged(evt);
				  },

				  mouseUp: function(evt) {
				    this.touchEnd(evt);
				  },

				  _curVal:0,
				  touchEnd: function(touch) {
				    console.log("wrapper touchEnd");
				    var diffX = this._accumulatedDifference.x,
				        val  = 0;

				    this._touchObject = null;

				    var state = this._state;
				    var multiplier = 1;
				    var didMove = false,
				        eligibleToMove = false;

				    // Should I check if i can move?
				    if(diffX < (-1 * this._movingThreshold)){
				      eligibleToMove = true;
				      multiplier = -1;
				    }  
				    else if(diffX > this._movingThreshold){
				      eligibleToMove = true;
				    }

				    // How much should I move by?
				    if(eligibleToMove){
				      if(state === 0 && multiplier > 0){
				        val = 0;
				      }
				      else if(state === (this.numObjects-this._numObjectsPerPage) && multiplier < 0){
				        val = 0;
				      }
				      else{
				        val = this.objectWidth;
				        didMove = true;
				      }  
				    } else {
				      touch.captureTouch(this, YES);
				      if (touch.touchResponder && touch.touchResponder !== this) touch.touchResponder.tryToPerform("touchEnd", touch);
				    }

				    // If I moved, update state
				    if(didMove){  
				      if(diffX < -50){
				        state++;
				      }  
				      else if(diffX > 50){
				        state--;
				      }
				    }

				    this._curVal += (multiplier * val);

				    this._state = state;

				    this._accumulatedDifference.x = 0;
				    this._accumulatedDifference.y = 0;
				    this._draggingMode = 0;
				    this.enableAnimations();
				    this._layer.style.WebkitTransform = 'translate3d('+this._curVal+'px,0px,0px)';
				    this.invokeLater(this.disableAnimations,100);
				  }
	
	
	
	
});
/* >>>>>>>>>> BEGIN source/views/scrollerMixin.js */
SC.mixin(SC.ScrollerView.prototype, {
scrollbarThickness: 14,
capLength: 18,
capOverlap: 14,
buttonOverlap: 11,
buttonLength: 41
});
/* >>>>>>>>>> BEGIN source/views/trailer_grid.js */
// ==========================================================================
// Project:   Asprouttrailer.TrailerGrid
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Asprouttrailer.TrailerGrid = SC.ListItemView.extend(
/** @scope ImageSearch.ImageThumbListItemView.prototype */ {
  
  escapeHTML: NO,
  
  classNames: ['itunes'],
  
});


/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   Asprouttrailer - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

// This page describes the main user interface for your application.  
Asprouttrailer.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
		
		defaultResponder: Asprouttrailer.statechart,
		
    childViews: 'middleView topView bottomView'.w(),

	      topView: SC.ToolbarView.design({
	        layout: { top: 0, left: 0, right: 0, height: 36 },
	        childViews: 'labelView loading'.w(),
	        anchorLocation: SC.ANCHOR_TOP,
	        		
							labelView: SC.LabelView.design({
	          				layout: { centerY: 0, height: 24, left: 213, right: 8 },
	          				controlSize: SC.LARGE_CONTROL_SIZE,
	          				fontWeight: SC.BOLD_WEIGHT,
	          				valueBinding: "Asprouttrailer.trailerSelection.title",
	          				escapeHTML: NO
	        					}),
										
	      }),

	      middleView: SC.SplitView.design({
	        layout: { left: 0, top: 36, right: 0, bottom: 32 },
	        layoutDirection: SC.LAYOUT_HORIZONTAL,
	        autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
	        defaultThickness: 0.8,
	        //The list view is nested into the scrollview which is now in the splitview.
	        topLeftView: SC.View.design({
	          layout: { top: 36, bottom: 32, width: 200 },
	          childViews: 'textField scrollView'.w(),
						textField: SC.TextFieldView.design({
	            layout: { top: 2, height: 24, left: 5, right: 5 },
	            controlSize: SC.LARGE_CONTROL_SIZE,
	            fontWeight: SC.BOLD_WEIGHT,
	            hint: 'search ',
	            valueBinding: 'Asprouttrailer.moviesController.searchTrailer',
	            target: "Asprouttrailer.moviesController",
	            action: "performSearch",
	            keyDown: function(evt) {
	              arguments.callee.base.apply(this,arguments); // necessary to guarantee regular handling of keyDown events, 
	                           // want to avoid that this overwrite messes everything up     	   
	              if (evt.keyCode === 13) {
	                // trigger the search after we've seen an "enter"
	                Asprouttrailer.moviesController.performSearch(); 
	                return YES;
	              } else {
	                return NO;
	              }
	            }}),
	
	            scrollView: SC.ScrollView.design({
	              hasHorizontalScroller: NO,
	              layout: { top: 28, bottom: 0, left: 5, right: 5 },
	              backgroundColor: 'white',
	              //Here is the original list view, which is bound to the tasksController
	              contentView: SC.ListView.design({
	                contentBinding: 'Asprouttrailer.moviesController.arrangedObjects',
	                selectionBinding: 'Asprouttrailer.moviesController.selection',
	                contentValueKey: "title",
	                contentIconKey: "poster",
	                exampleView: Asprouttrailer.TrailersListItemView,
	                hasContentIcon:  YES,
	                escapeHTML: NO,
	                rowHeight: 70,
	              })
	            })
	        }),
	        //topLeftMinThickness: 150,
	        topLeftMaxThickness: 250,
	        //canCollapseViews: YES,
	        dividerView: SC.SplitDividerView.design({
	            layout: {}
	        }),
	        //This view shows up on the right. It is a placeholder, later we will use a formview.
	        bottomRightView: SC.View.design({
								childViews: 'trailers url'.w(),
					trailers:SC.ListView.design({
											layout:{right:0,top:45,width:200,bottom:45},
											backgroundColor:'white',
									   	contentValueKey: "type",
											contentBinding: "Asprouttrailer.trailersController.arrangedObjects",
											selectionBinding: "Asprouttrailer.trailersController.selection",
									    rowHeight: 100,
											rowSpacing: 2,
										}),
					url:SC.LabelView.design({
											 layout:{top:40,left:20,width:300,height:30},
											 escapeHTML: NO,
											isTextSelectable: YES,
											valueBinding:'Asprouttrailer.trailerContentController.newURL',
											srcLink: function() {
											    return '<a href=' + this.get('url') +'>'+ this.get('url');
											  }.property('url').cacheable(),
										}),
		
		
						}),
	      }),

	      bottomView: SC.ToolbarView.design({
	        layout: { bottom: 0, left: 0, right: 0, height: 32 },
	        anchorLocation: SC.ANCHOR_BOTTOM
	      })
	    })
	

});

/* >>>>>>>>>> BEGIN source/resources/movie_trailer_page.js */

/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   Asprouttrailer
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Asprouttrailer.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
	var results = Asprouttrailer.store.find(resultsQuery);
	var popResults = Asprouttrailer.storeB.find(popResultsQuery);
	
	console.log(Asprouttrailer.store.get('statuses'));
	console.log(Asprouttrailer.storeB);
	console.log(Asprouttrailer.storeC);

	SC.Request.manager.inflight.addObserver('[]', function(array) {
	  var length=array.get('length');
	  SC.debug('Number of inflight requets are %@', length);
	  // Need to run with the SC Event Loop to update the visuals 
	  SC.RunLoop.begin();
		Asprouttrailer.justAddedPage.getPath('mainPane.justAdded.topLeftView.itunesTopBar.itunesLoading').set('isVisible', length > 0);
		Asprouttrailer.justAddedPage.getPath('mainPane.justAdded.topLeftView.nyTopBar.nyLoading').set('isVisible', length > 0);
		Asprouttrailer.justAddedPage.getPath('mainPane.justAdded.bottomRightView.contentView.iTunesLoading').set('isVisible', length > 0);
		SC.RunLoop.end();
		
		
		
	});

  Asprouttrailer.statechart.initStatechart();

  //Asprouttrailer.getPath('mainPage.mainPane').append() ;


	//var query = SC.Query.local(Asprouttrailer.Trailers);
	//var tasks = Asprouttrailer.store.find(query);
	//Asprouttrailer.moviesController.set('content', tasks);
	
	//var query = SC.Query.local(Asprouttrailer.Trailers, {query: 'Garden of Eden'});
  //var images = Asprouttrailer.store.find(query);
 // Asprouttrailer.moviesController.set('content', images);



  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Asprouttrailer.contactsController.set('content',Asprouttrailer.contacts);

} ;

function main() { Asprouttrailer.main(); }

