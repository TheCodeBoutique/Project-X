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
