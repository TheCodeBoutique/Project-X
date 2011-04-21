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
