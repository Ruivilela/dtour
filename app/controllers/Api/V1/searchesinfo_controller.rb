class Api::V1::SearchesinfoController < ApplicationController
  def search_result
  end

  def all_gigs
    @gigs = TourDate.all
    render json: @gigs
  end

  def current_band_gig
    @gigs = TourDate.where(band_id:params[:band_id]).all
    render json: @gigs
  end

  def all_bands
    @bands = Band.find_by(id: params[:id])
    render json: @bands
  end
end
