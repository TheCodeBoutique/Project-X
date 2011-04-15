Asprouttrailer.CustomScroller = SC.ScrollView.extend({
	

	
	horizontalScrollOffset: function(key, value) {
   if (value !== undefined) {
     var minOffset = this.minimumHorizontalScrollOffset(),
         maxOffset = this.get('maximumHorizontalScrollOffset');
     this._scroll_horizontalScrollOffset = Math.max(minOffset,Math.min(maxOffset, value)) ;
   }

   return this._scroll_horizontalScrollOffset||0;
 }.property().cacheable(),


maximumScrollOffset: function(contentSize, containerSize, align) {

				console.log('this is contentSize = 176'); 
				console.log('this is containerSize = 176'); 
     // if our content size is larger than or the same size as the container, it's quite
     // simple to calculate the answer. Otherwise, we need to do some fancy-pants
     // alignment logic (read: simple math)
			
     if (contentSize >= containerSize) return contentSize - containerSize;
     
     // alignment, yeah
     if (align === SC.ALIGN_LEFT || align === SC.ALIGN_TOP) {
       // if we left-align something, and it is smaller than the view, does that not mean
       // that it's maximum (and minimum) offset is 0, because it should be positioned at 0?
       return 0;
     } else if (align === SC.ALIGN_MIDDLE || align === SC.ALIGN_CENTER) {
       // middle align means the difference divided by two, because we want equal parts on each side.
       return 0 - Math.round((containerSize - contentSize) / 2);
     } else {
       // right align means the entire difference, because we want all that space on the left
       return 0 - (containerSize - contentSize);
     }
   },
   
   /**
     @private
     Calculates the minimum offset given content and container sizes, and the
     alignment.
   */
   minimumScrollOffset: function(contentSize, containerSize, align) {
     // if the content is larger than the container, we have no need to change the minimum
     // away from the natural 0 position.

     if (contentSize > containerSize) return 0;
     
     // alignment, yeah
     if (align === SC.ALIGN_LEFT || align === SC.ALIGN_TOP) {
       // if we left-align something, and it is smaller than the view, does that not mean
       // that it's maximum (and minimum) offset is 0, because it should be positioned at 0?
       return 0;
     } else if (align === SC.ALIGN_MIDDLE || align === SC.ALIGN_CENTER) {
       // middle align means the difference divided by two, because we want equal parts on each side.
       return 0 - Math.round((containerSize - contentSize) / 2);
     } else {
       // right align means the entire difference, because we want all that space on the left
       return 0 - (containerSize - contentSize);
     }
   },



maximumHorizontalScrollOffset: function() {
   var view = this.get('contentView');
			console.log(view);
   var contentWidth = 0;
		var calculatedWidth = 0;


       
   if (view && view.get('frame')) contentWidth = view.get('frame').width;
   if (view) calculatedWidth = view.calculatedWidth || 0;
   
   // The following code checks if there is a calculatedWidth (collections)
   // to avoid looking at the incorrect value calculated by frame.
   if(view && view.calculatedWidth && view.calculatedWidth!==0){
     contentWidth = view.calculatedWidth; 
   }
   contentWidth *= this._scale;
		console.log('this is content width');
				console.log(contentWidth);
				
   contentWidth += 400;
		console.log('this is content width');
				console.log(contentWidth);
   var containerWidth = this.get('containerView').get('frame').width ;
	
   containerWidth += 400;
	console.log(containerWidth);
   // we still must go through minimumScrollOffset even if we can't scroll
   // because we need to adjust for alignment. So, just make sure it won't allow scrolling.
   if (!this.get('canScrollHorizontal')) contentWidth = Math.min(contentWidth, containerWidth);
   return this.maximumScrollOffset(contentWidth, containerWidth, this.get("horizontalAlign"));
 }.property(),

	

	
});