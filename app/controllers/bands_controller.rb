class BandsController < ApplicationController
before_action :authenticate_user!
  def redirect_band
    redirect_to '/band/page/1'
  end

  def show
    if (params[:id].to_s == current_user.id.to_s)
      @band = Band.find_by(user_id: params[:id])
      @tourdate = []
      TourDate.where(band_id: params[:id]).find_each do |gig|
        @tourdate << gig
      end
    else
      redirect_to '/permission/denied'
    end
  end
  
  def error_page
  end
end
