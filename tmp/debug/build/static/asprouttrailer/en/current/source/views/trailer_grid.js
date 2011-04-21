// ==========================================================================
// Project:   Asprouttrailer.TrailerGrid
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Asprouttrailer.TrailerGrid = SC.ListItemView.extend(
/** @scope ImageSearch.ImageThumbListItemView.prototype */ {
  
  escapeHTML: NO,
  
  classNames: ['itunes'],
  
});

; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('asprouttrailer');