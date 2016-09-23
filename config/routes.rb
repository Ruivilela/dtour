Rails.application.routes.draw do
  root to: 'users#profile'
  devise_for :users

  get 'pick/location', to:'maps#pick_location'
  get 'band/page/:id', to:'bands#show' , as: :band
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
