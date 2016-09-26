class Api::V1::TourdatemodelupdatesController < ApplicationController
  def create_tour_date
    @Tourdate = TourDate.create(band_id: current_user.id)
    @Tourdate.update(Longitude: params[:Longitude],Latitude:params[:Latitude] , address: params[:address])
  end

  def current_markers
    @tourdate = TourDate.where(band_id: current_user.id).all
    render json: @tourdate
  end
end





# private
# def params_for_create
#   params.require(:TourDate).permit(:Longitude,:Latitude,:address)
# end
