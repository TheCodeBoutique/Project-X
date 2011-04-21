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
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');