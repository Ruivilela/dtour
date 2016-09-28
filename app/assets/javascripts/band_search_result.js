if(window.location.pathname.split('&')[0] + '&' == '/band/page&'){
  document.addEventListener('DOMContentLoaded', function() {
    LoadSearchedBandMap();
  });
}
// loads the map elements
function LoadSearchedBandMap(){
  initTourMap(document.getElementById("searched_band_map"));  // same function of the info_page to update
}
