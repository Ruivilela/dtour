Rails.application.routes.draw do
  root to: 'users#profile'
  devise_for :users

  get 'pick/location', to:'maps#pick_location'
  get 'band/page/:id', to:'bands#show' , as: :band
  patch 'band/page/update', to:'bands#update'
  get '/permission/denied', to:'bands#error_page'

  namespace :api do
      namespace :v1 do
        patch 'band/page/update/name', to:'bandmodelupdates#update_band_name'
        patch 'band/page/update/about', to:'bandmodelupdates#update_band_about'
        patch 'band/page/update/price', to:'bandmodelupdates#update_band_price'
        patch 'band/page/update/requirements', to:'bandmodelupdates#update_band_requirements'
      end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
