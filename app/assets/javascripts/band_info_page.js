var tour_map;
var tour_date_search = [];
var tour_date_added = [];
var bounds

if(window.location.pathname.replace(/[0-9]/g, '') == '/band/page/'){
  document.addEventListener('DOMContentLoaded', function() {
      document.addEventListener('click', checkElement);
      LoadMap();
  });
}
// checkFor Element
function checkElement(event){
  var element_targeted = event.target.id.split('_')
  if(element_targeted[0] == "edit"){
    var edit_button = document.getElementById('edit_' + element_targeted[1]);
    var save_button = document.getElementById('save_' + element_targeted[1]);
    var edit_field = document.getElementById('band_' + element_targeted[1]);
    var static_field = document.getElementById('static_' + element_targeted[1]);
    EditMode(edit_button, save_button, edit_field, static_field);
    };
}
// edit mode checks if it will start editing or not
function EditMode(edit_button,save_button, edit_field, static_field){
  if(save_button.style.display == "none"){
    initEditMode(edit_button,save_button, edit_field,static_field);
  }
  else {
    quitEditMode(save_button, edit_field, static_field);
  }
}
// InitEditMode
function initEditMode(edit_button,save_button, edit_field, static_field){
  save_button.style.display = "unset";
  edit_field.style.display = "unset";
  static_field.style.display = "none";

  save_button.addEventListener('click',function(){
      saveChanges(edit_field, static_field)
      quitEditMode(save_button, edit_field, static_field);
  });
}
// quitEditMode
function quitEditMode(save_button, edit_field, static_field){
  save_button.style.display = "none";
  edit_field.style.display = "none";
  static_field.style.display = "unset";
}
// Save Changes
function saveChanges(edit_field, static_field){
  static_field.textContent = edit_field.value;
  sendToDb(edit_field);
}
// ajax calls goes here
function sendToDb(info){
  var update_field = {};
  var params_key = info.id.split('_')[1];
  update_field[params_key] = info.value;

  $.ajax({
    type: 'PATCH',
    url: "/api/v1/band/page/update/" + params_key,
    data: update_field,
    dataType:"json",
    success: updated,
    error: not_working
  });
}
// handlers results
function updated(){
  console.log("Congrats, working!");
}
function not_working(){
  console.log("It's not working!");
}
// Implementing the map on band_Info_page //
function LoadMap(){
  initTourMap(document.getElementById('tourmap'));
  bounds = new google.maps.LatLngBounds();
  currentTourDates();
  tour_map.fitBounds(bounds);
  document.getElementById('add_date').addEventListener('click', openModal)
}
// creates the map
function initTourMap(element){
  tour_map = new google.maps.Map(element,{
      center:{lat: -34.397, lng: 150.644},
      zoom: 13
    });
}
// get currentMarkers
function currentTourDates(){
  $.ajax({
    type:'GET',
    url:'/api/v1/band/current/markers',
    success:LoadMarkers,
    error: not_working
  });
}
// LoadMarkers
function LoadMarkers(myMarkers){
  for(var i = 0; i < myMarkers.length; i++){
    createCurrentMarker(i, myMarkers)
  };
}
/// createsCurrentMarkers
function createCurrentMarker(i, myMarkers){
  new google.maps.Marker({
    position:{
      lat:Number(myMarkers[i]["Latitude"]),
      lng:Number(myMarkers[i]["Longitude"])
    },
    map: tour_map,
    title: myMarkers[i]['address']
  });
  bounds.extend({
    lat:Number(myMarkers[i]["Latitude"]),
    lng:Number(myMarkers[i]["Longitude"])
  });
}
/// Tour date markers
function createTourDateMarker(position, title){
  tourMarkers = new google.maps.Marker({
    position: position,
    map: tour_map,
    title: title.address_components[0].short_name
  });
  tour_date_search.push(tourMarkers);
}
// openModal map
function openModal(){
  document.getElementById('map_modal').style.display ='unset';
  LoadMapModal();
}
// closes the modal map
function closeModal(){
    document.getElementById('map_modal').style.display ='none';
}
// handles all the map functionalities inside the modal
function LoadMapModal(){
  initTourMap(document.getElementById('tourmap_modal'))
  currentTourDates();
  tour_map.fitBounds(bounds);
  /// ---- click actions ////
  document.getElementById('modal_delete').addEventListener('click', closeModal);
  document.getElementById('modal_cancel').addEventListener('click', closeModal);
  document.getElementById('search_location_modal').addEventListener('click', search_location_modal);
  document.getElementById('add_gig').addEventListener('click', addGig)
  document.getElementById('save_added_gig').addEventListener('click', SaveTourDatesModal);
}
// search for result in modal
function search_location_modal(){
  clearMarkerHistory();
  var geocoder = new google.maps.Geocoder();
  var address_value = document.getElementById('insert_gig_place').value;
    if (address_value == '') {console.log('must insert address')}
    else {
        geocoder.geocode({address: address_value}, function(results,status){
      if (status == google.maps.GeocoderStatus.OK){
        tour_map.setCenter(results[0].geometry.location);
        createTourDateMarker(results[0].geometry.location, results[0]);
        } else {console.log("location not found be more specific")}
      });
    }
}
/// clear tour date Marker History
function clearMarkerHistory(){
  for(var i = 0; i < tour_date_search.length; i++ ){
    tour_date_search[i].setMap(null)
  };
}
/// add Gig
function addGig(){
  date = document.getElementById("date_picker_modal").value
  if ( date === "" || date <= Date.now()){
    console.log('not acceptable')
  } else {
    gig_to_add = tour_date_search.pop()
    tour_date_added.push(gig_to_add);
    appendGig(gig_to_add);
  }
}
/// append Gig
function appendGig(gig_to_add){
  ul = document.getElementById('list_of_gigs');
  li = document.createElement('LI');
  city = document.createTextNode(gig_to_add.title);
  li.appendChild(city);
  ul.appendChild(li);
}
// save tour dates
function SaveTourDatesModal(){
  for(var i = 0; i < tour_date_added.length; i++){
    var marker_info ={}
    marker_info["Longitude"] = String(tour_date_added[i].position.lng());
    marker_info["Latitude"] = String(tour_date_added[i].position.lat());
    marker_info["address"] = tour_date_added[i].title;
    $.ajax({
      type: 'POST',
      url: "/api/v1/band/page/marker/create",
      data: marker_info,
      dataType:"json",
      success: updated,
      error: not_working
    });
  };
  closeModal();
}
