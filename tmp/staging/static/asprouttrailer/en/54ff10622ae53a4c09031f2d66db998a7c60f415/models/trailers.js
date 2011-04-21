// ==========================================================================
// Project:   Asprouttrailer.Trailers
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Asprouttrailer */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Asprouttrailer.Trailers = SC.Record.extend(
/** @scope Asprouttrailer.Trailers.prototype */ {
primaryKey: 'title', 

title:SC.Record.attr(String),
releasedate:SC.Record.attr(String),
studio:SC.Record.attr(String),
poster:SC.Record.attr(String),
moviesite:SC.Record.attr(String),
location:SC.Record.attr(String),
rating:SC.Record.attr(String),
//genre:SC.Record.attr(String),
//directors:SC.Record.attr(String),
//actors:SC.Record.attr(String),
   

trailers:SC.Record.toOne(
    'Asprouttrailer.Trailer', 
    { isMaster: YES, inverse: 'trailer', isNested: YES }
  ),
	hyperLink: function() {
			var moviewURL = this.get('location');
			 moviewURL.replace("/trailers", "");
			console.log(moviewURL);
			
	    return "<video id='' class='video' x-webkit-airplay='allow' width='640' height='272' " + this.get('poster') +'autoplay="autoplay" bgcolor="white">'+ '<source src="http://trailers.apple.com/movies' + this.moviewURL +'type="video/mp4">' + '</video>';
	  }.property('poster').cacheable(),
//<source src="http://trailers.apple.com/movies/lionsgate/conanthebarbarian/conanthebarbarian-tlr1_r640s.mov" type="video/mp4"></video>
									
//<video id="" class="video" x-webkit-airplay="allow" width="640" height="272" poster="http://trailers.apple.com/trailers/global/elements/quicktime/qt_endstate640x400.jpg" autoplay="autoplay" bgcolor="white">
}) ;
