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