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
					              sc_super(); // necessary to guarantee regular handling of keyDown events, 
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
																																									value: sc_static('/images/left.png'),
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
																																										value: sc_static('/images/right.png'),
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
																																									value: sc_static('/images/left.png'),
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
																																										value: sc_static('/images/right.png'),
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
																											              sc_super(); // necessary to guarantee regular handling of keyDown events, 
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