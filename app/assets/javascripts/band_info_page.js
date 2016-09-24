if(window.location.pathname.replace(/[0-9]/g, '') == '/band/page/'){
  window.onload = function(){
    var edit_button = document.getElementById('edit_about');
    var save_button = document.getElementById('save_about');
    var edit_field = document.getElementById('band_about');
    var static_field = document.getElementById('static_about')

    save_button.style.display = "none";
    edit_field.style.display = "none";

    edit_button.addEventListener('click',function(){
      EditMode(edit_button, save_button, edit_field, static_field);
    });
  }
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
  })
}
// quitEditMode
function quitEditMode(save_button, edit_field, static_field){
  save_button.style.display = "none";
  edit_field.style.display = "none";
  static_field.style.display = "unset";
}
// Save Changes
function saveChanges(edit_field, static_field){
  
}
