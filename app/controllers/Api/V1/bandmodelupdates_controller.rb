class Api::V1::BandmodelupdatesController < ApplicationController
  def update_band_name
    @band = Band.find_by(user_id: current_user.id)
    @band.update(name: params[:name])
  end

  def update_band_about
    @band = Band.find_by(user_id: current_user.id)
    @band.update(about: params[:about])
  end

  def update_band_price
    @band = Band.find_by(user_id: current_user.id)
    @band.update(price: params[:price])
  end

  def update_band_requirements
    @band = Band.find_by(user_id: current_user.id)
    @band.update(requirements: params[:requirements])
  end

  def update_band_profilepic
    @band = Band.find_by(user_id: current_user.id)
    @band.update(profilepic: params[:profilepic])
  end
end

#about: params[:about], price: params[:price], radius: params[:radius],
#requirements: params[:requirements], facebook: params[:facebook], twitter: params[:twitter], soundcloud: params[:soundcloud],
#spotify:params[:spotify], profile_pic:params[:profile_pic] -->
