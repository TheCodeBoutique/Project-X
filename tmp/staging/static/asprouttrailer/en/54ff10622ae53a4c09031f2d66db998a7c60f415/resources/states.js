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
