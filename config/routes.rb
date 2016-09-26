Rails.application.routes.draw do
  root to: 'users#profile'
  devise_for :users

  #searches controller
  get 'pick/location', to:'searches#pick_location'
  get 'search/result/', to:'searches#show_search_results'

  # bands controller
  get 'band/page/:id', to:'bands#show' , as: :band
  patch 'band/page/update', to:'bands#update'
  get '/permission/denied', to:'bands#error_page'

  namespace :api do
      namespace :v1 do
        # band tour dates
        get 'band/current/markers', to:'tourdatemodelupdates#current_markers'
        post 'band/page/marker/create', to: 'tourdatemodelupdates#create_tour_date'
        delete 'delete/date', to: 'tourdatemodelupdates#delete_tour_date'
        # band info Field
        patch 'band/page/update/name', to:'bandmodelupdates#update_band_name'
        patch 'band/page/update/about', to:'bandmodelupdates#update_band_about'
        patch 'band/page/update/price', to:'bandmodelupdates#update_band_price'
        patch 'band/page/update/requirements', to:'bandmodelupdates#update_band_requirements'
        #searches info
        get 'available/gigs', to: "searchesinfo#all_gigs"
      end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
