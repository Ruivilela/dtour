var map;
var markers = [];

if(window.location.pathname == '/pick/location'){
  window.onload = function(){
    initMap({lat: -34.397, lng: 150.644});
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(yourLocation, onError)
    }
    var zoomAutoComplete = new google.maps.places.Autocomplete(
      document.getElementById('search_location_input'));

    document.getElementById('search_location_button').addEventListener('click', newLocation)
  }
}
// creates the map
function initMap(position){
  map = new google.maps.Map(document.getElementById('pick_location'),{
    center: position,
    zoom: 13
  });
}
// shows your location in the map
function yourLocation(position){
  var user_position = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  createMarker(user_position);
  map.setCenter(user_position);
}
// search new location
function newLocation(){
  clearMarkers();
  searchLocation();
}

// search for location in the google Map api
function searchLocation(){
  var geocoder = new google.maps.Geocoder();
  var address_value = document.getElementById('search_location_input').value;
    if (address_value == '') {console.log('must insert address')}
    else {
        geocoder.geocode({address: address_value}, function(results,status){
      if (status == google.maps.GeocoderStatus.OK){
        map.setCenter(results[0].geometry.location);
        createMarker(results[0].geometry.location);
        } else {console.log("location not found be more specific")}
      });
    }
}
// creates Marker
function createMarker(position){
  marker = new google.maps.Marker({
    position: position,
    // draggable: true,
    map: map
  });
  markers.push(marker);
}
// clears Marker
function clearMarkers(){
  for (var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  };
}
// error callback
function onError(){
  console.log('something went wrong')
}
