class BandsController < ApplicationController
before_action :authenticate_user!

  def show
    if (params[:id].to_s == current_user.id.to_s)
      @band = Band.find_by(user_id: params[:id])
    else
      render html: "<strong> Permission is required</strong>".html_safe
    end
  end

  def update
    @band = Band.find_by(user_id: current_user.id)
    @band.update(about: params[:about])
        #  about: params[:about],price: params[:price], requirements: params[:requirements])
  end
end

#about: params[:about], price: params[:price], radius: params[:radius],
#requirements: params[:requirements], facebook: params[:facebook], twitter: params[:twitter], soundcloud: params[:soundcloud],
#spotify:params[:spotify], profile_pic:params[:profile_pic] -->
