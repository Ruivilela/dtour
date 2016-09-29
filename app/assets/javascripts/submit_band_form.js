function startForm(x){
  field = x.id.split('_')[1];
  edit_button = x.id
  save_button = document.getElementById("save_" + field);
  edit_field = document.getElementById("band_" + field);
  static_field = document.getElementById("static_" + field);
  verifyStatus(save_button, edit_button, edit_field, static_field);
}
// verifies wether is opend or closed
function verifyStatus(save_button, edit_button, edit_field, static_field){
  if(save_button.style.display == "none"){
    openForm(save_button, edit_button, edit_field, static_field);
  }
  else {
    closeForm(save_button, edit_field, static_field);
  };
}
/// opens the Form
function openForm(save_button, edit_button, edit_field, static_field){
  showElement(save_button);
  showElement(edit_field);
  hideElement(static_field);
  save_button.addEventListener('click', function(){
    static_field.textContent = edit_field.value
    submitFormValue(edit_field);
    closeForm(save_button, edit_field, static_field);
  });
}
/// closes the form
function closeForm(save_button, edit_field, static_field){
  hideElement(save_button);
  hideElement(edit_field);
  showElement(static_field);
}
// does the patch request
function submitFormValue(edit_field){
  update_field = {};
  params_key = edit_field.id.split('_')[1];
  update_field[params_key] = edit_field.value;
  $.ajax({
      type: 'PATCH',
      url: "/api/v1/band/page/update/" + params_key,
      dataType:"json",
      data: update_field,
      success: updated,
      error: not_working
    });
}
// hides an element
function showElement(element){
  element.style.display = "unset";
}
// shows an element
function hideElement(element){
  element.style.display = "none";
}
