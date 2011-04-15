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
	              sc_super(); // necessary to guarantee regular handling of keyDown events, 
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
