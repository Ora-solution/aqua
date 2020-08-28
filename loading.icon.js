/*
 * 
 * Loading Icon Prozeduren
 * Version 1.0.0
 * 
 */

/*
 * 
 * Center Plugin: http://test.learningjquery.com/center.html
 * Aufruf: $('#loadingIcon').center();
 * 
 */
jQuery.fn.center = function(options) {
            var pos = {
              sTop : function() {
                return window.pageYOffset || document.documentElement && document.documentElement.scrollTop ||	document.body.scrollTop;
              },
              wHeight : function() {
                return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
              }
            };
            return this.each(function(index) {
              if (index == 0) {
                var $this = $(this);
                var elHeight = $this.outerHeight();
                var elTop = pos.sTop() + (pos.wHeight() / 2) - (elHeight / 2);
                $this.css({
                  position: 'absolute',
                  margin: '0',
                  top: elTop,
                  left: (($(window).width() - $this.outerWidth()) / 2) + 'px'
                });
              }
            });
          };

/*
 * 
 * Create Dynamic Load Icon
 * Info: Generierung von zwei Elementen Icon und Hintergrund zur Darstellung der Ladeprozedur
 * Aufruf: fnc_startLoadIcon('...loading...','default',35,35,8,'#98AAC8',6);
 * 
 */
function fnc_startLoadIcon(v_icon_text,v_icon_image,v_icon_width,v_icon_height,v_icon_opacity,v_icon_color,v_background_opacity){
  // get browser size
  var v_browserWidth = $(document).width();
  var v_browserHeight = $(document).height();

  // Load image
  var v_load_image = new Image();
      v_load_image.src = v_icon_image;
  
  // Set opacity
  if (v_icon_opacity == 10){
    v_icon_opacity_ie = '100';
    v_icon_opacity_ff = '1.0';
  } else {
    v_icon_opacity_ie = v_icon_opacity + '0';
    v_icon_opacity_ff = '0.' + v_icon_opacity;
  }
  
  if (v_background_opacity == 10){
    v_background_opacity_ie = '100';
    v_background_opacity_ff = '1.0';
  } else {
    v_background_opacity_ie = v_background_opacity + '0';
    v_background_opacity_ff = '0.' + v_background_opacity;
  }
  
  // set styles for elements
  var v_styleLoadingBackground = 'style="width:'+v_browserWidth+'px;'+'height:'+v_browserHeight+'px;position:absolute;left:0;top:0;background-color:#FFFFFF;z-index: 4000;';
  var v_styleLoadingBackground = v_styleLoadingBackground + 'filter:Alpha(opacity='+v_background_opacity_ie+');-moz-opacity:'+v_background_opacity_ff+';opacity:'+v_background_opacity_ff+';" ';
  var v_styleLoadingIcon = 'style="padding:5px; font-size:18px; width:200px; text-align:center;border:1px solid '+v_icon_color+'; background-color:#FFFFFF; color:'+v_icon_color+';';
  var v_styleLoadingIcon = v_styleLoadingIcon + 'filter:Alpha(opacity='+v_icon_opacity_ie+');-moz-opacity:'+v_icon_opacity_ff+';opacity:'+v_icon_opacity_ff+';z-index: 4001;" '
  var v_styleImgLoadIcon = 'style="height:'+v_icon_height+'px;width:'+v_icon_width+'px;" ';

 
  // set element source
  var v_loadingBackground = '<div id="loadingBackground" '+v_styleLoadingBackground+'></div>';
  var v_loadingIcon = '<div id="loadingIcon" '+v_styleLoadingIcon+'>';
      // Check if Icon text is empty
     if (v_icon_text != 'empty') {
          v_loadingIcon = v_loadingIcon + v_icon_text + '<br />';
     }
     v_loadingIcon = v_loadingIcon + '<img id="wait" src="' + v_icon_image + '" ' + v_styleImgLoadIcon +' align="middle"/></div>';
  
  // Debug
  // alert('v_loadingBackground: ' + v_loadingBackground);
  // alert('v_loadingIcon: ' + v_loadingIcon);

  // create elements
  // 1. Hide (Display None), 2. AppendTo Body, 3. FadeIn Effect
  $(v_loadingBackground).hide().appendTo($('body')).fadeIn("slow");
  $(v_loadingIcon).hide().appendTo($('body')).fadeIn("slow");


  // center element
  $('#loadingIcon').center();
}

/*
 * 
 * Remove Dynamic Load Icon
 * Info: Löschen von Icon und Hintergrund
 * Aufruf: fnc_stopLoadIcon();
 * 
 * 
 */
function fnc_stopLoadIcon(){
  // 1. Fade Out Effect, 2. Remove Element
  $("#loadingBackground").fadeOut(500, function() {$('#loadingBackground').remove();}); // "linear", 
  $("#loadingIcon").fadeOut(500, function() {$('#loadingIcon').remove();});
}
