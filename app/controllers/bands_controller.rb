class BandsController < ApplicationController
  def show
    @band = Band.find_by(user_id: params[:id])
  end

  def update
    @band = Band.find_by(user_id: current_user.id)
    @band.update(about:params[:about])
  end
end
