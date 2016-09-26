var queryMap
var user_position
var query_markers = [];
var bounds_query

if(window.location.pathname.split('%')[0] == '/search/result'){
  document.addEventListener('DOMContentLoaded', function() {
    LoadQueryMap();
  });
}
// load query map
function LoadQueryMap(){
  initQueryMap()
  document.getElementById('submit_search2').addEventListener('click', searchLocation2);
  // LoadQueryMarkers()
}
//load Query Map
function initQueryMap(){
  queryMap = new google.maps.Map(document.getElementById('querymap'),{
      center:{lat: -34.397, lng: 150.644},
      zoom: 13
  });
}
/// searchLocation2
function searchLocation2(){
  var geocoder = new google.maps.Geocoder();
  var address_value = document.getElementById('search_location_input2').value;
    if (address_value == '') {console.log('must insert address')}
    else {
        geocoder.geocode({address: address_value}, function(results,status){
      if (status == google.maps.GeocoderStatus.OK){
        user_position = results[0].geometry.location
        user_marker = createQueryMarker(user_position);
        user_marker.setIcon('/maps/heavy-metal.png');
        LoadQueryMarkers();
        } else {console.log("location not found be more specific")}
      });
    }
}
// load Markers that where searched
function LoadQueryMarkers(){ 
  $.ajax({
      type:'GET',
      url:'/api/v1/available/gigs',
      success:LoadGigs,
      error: not_working
  });
}
///Load Gigs
function LoadGigs(places){
  for(var i = 0 ; i < places.length ; i++){
    marker = new google.maps.LatLng(
      Number(places[i]["Latitude"]),
      Number(places[i]["Longitude"])
    );
    checkDistance(marker)
  }
}
// checkDistance if it is the right radius
function checkDistance(gigs){
  distance = google.maps.geometry.spherical.computeDistanceBetween(user_position, gigs);
  if (distance < 80000){
    createQueryMarker(gigs);

  };
}
/// create Query Marker
function createQueryMarker(position){
  marker = new google.maps.Marker({
    position: position,
    // draggable: true,
    map: queryMap
  });
  query_markers.push(marker);
  return marker;
}
