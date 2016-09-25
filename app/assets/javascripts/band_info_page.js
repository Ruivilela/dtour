var tour_map;
var tour_dates = [];

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
// Implementing the map on band_Info_page
function LoadMap(){
  initTourMap(document.getElementById('tourmap'))
  document.getElementById('add_date').addEventListener('click', openModal)
}
// creates the map
function initTourMap(element){
  tour_map = new google.maps.Map(element,{
      center:{lat: -34.397, lng: 150.644},
      zoom: 13
    });
}
/// Tour date markers
function CreateTourDates(position){
  tourMarkers = new google.maps.Marker({
    position: position,
    map: tour_map
  });
  tour_dates.push(tourMarkers);
}
// openModal map
function openModal(){
  document.getElementById('map_modal').style.display ='unset';
  LoadMapModal();
  closeModal();
}
// closes the modal map
function closeModal(){
  document.getElementById('modal_delete').addEventListener('click', function(){
    document.getElementById('map_modal').style.display ='none';
  });
}
// handles all the map functionalities inside the modal
function LoadMapModal(){
  initTourMap(document.getElementById('tourmap_modal'))
}
