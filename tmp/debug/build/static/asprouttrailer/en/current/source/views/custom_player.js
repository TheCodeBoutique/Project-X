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


});; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');