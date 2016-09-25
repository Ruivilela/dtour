class BandsController < ApplicationController
before_action :authenticate_user!

  def show
    if (params[:id].to_s == current_user.id.to_s)
      @band = Band.find_by(user_id: params[:id])
    else
      redirect_to '/permission/denied'
    end
  end

  def error_page
  end
end
