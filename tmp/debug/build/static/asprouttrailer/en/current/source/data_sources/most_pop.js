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
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');