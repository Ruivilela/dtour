class Api::V1::TourdatemodelupdatesController < ApplicationController
  def create_tour_date
    @Tourdate = TourDate.create(band_id: current_user.id)
    @Tourdate.update(Longitude: params[:Longitude],Latitude:params[:Latitude] , address: params[:address], date: params[:date])
  end

  def current_markers
    @tourdate = TourDate.where(band_id: current_user.id).all
    render json: @tourdate
  end

  def delete_tour_date
    @tourdate = TourDate.where(band_id: current_user.id).find_by(id: params[:id])
    @tourdate.delete
  end
end

# private
# def params_for_create
#   params.require(:TourDate).permit(:Longitude,:Latitude,:address)
# end
