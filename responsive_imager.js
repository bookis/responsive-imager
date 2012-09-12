jQuery(document).ready(function() {
  $('img').each(function() { 
    replaceResponsiveImage($(this)); 
  });
  
  $(window).resize(function(event) {
    $('img').each(function() { 
      replaceResponsiveImage($(this)); 
    });
  });
});

function replaceResponsiveImage(img) {
  if (img.data('original-src') == null) {
    img.data('original-src', img.prop('src'));
  };
  var highestMatch = 0;
  var mediaSource;
  img.nextAll('source').each(function() {
    mediaQuery = $(this).prop('media');
    if (matchMedia(mediaQuery).matches) {
      screenWidth = mediaQuery.match(/\d+/);
      if (screenWidth >= highestMatch) { 
        highestMatch = screenWidth; 
        mediaSource = $(this).prop('src')
      }
    }
  });
  if (highestMatch > 0) {
    img.prop('src', mediaSource)
  } else {
    img.prop('src', img.data('original-src'))
  };
};