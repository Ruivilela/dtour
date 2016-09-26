class Api::V1::SearchesinfoController < ApplicationController
  def search_result

  end

  def all_gigs
    @gigs = TourDate.all
    render json: @gigs
  end
end
