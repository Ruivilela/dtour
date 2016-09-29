if(window.location.pathname.split('&')[0] + '&' == '/band/page&'){
  document.addEventListener('DOMContentLoaded', function() {
    LoadSearchedBandMap();
  });
}
// loads the map elements
function LoadSearchedBandMap(){
  initTourMap(document.getElementById("searched_band_map"));  // same function of the info_page to update
  bounds = new google.maps.LatLngBounds();
  insertBandMarkers();
  tour_map.fitBounds(bounds);
}
// creates the markers of the band tour
function insertBandMarkers(){
  loadMarkersInfo(window.location.pathname.split('&')[2]);
}
/// LoadMarkersInfo
function loadMarkersInfo(current_band_id){
  $.ajax({
    type: 'GET',
    url: "/api/v1/current/markers/search/" + current_band_id,
    success:current_band_markers,
    error: not_working
  });
}
/// info of current band markers
function current_band_markers(object){
  for(var i=0; i < object.length; i++){
    marker = new google.maps.Marker({
     position:{
       lat:Number(object[i]['Latitude']),
       lng:Number(object[i]['Longitude'])
     },
     map: tour_map,
     title:'<h3>'+ object[i]['address'] + '</h3>' + object[i]['date']
   })
  //  tour_date_added.push(marker);
   populateMarker(marker);    // from search_result
   bounds.extend(marker.position);
  //  marker.addListener('click', function(){
  //    infowindow.setContent(marker.title);
  //    infowindow.open(tour_map, marker)
  //  });
 };
}
