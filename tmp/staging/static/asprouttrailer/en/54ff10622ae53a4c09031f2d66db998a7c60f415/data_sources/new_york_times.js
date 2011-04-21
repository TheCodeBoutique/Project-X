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
