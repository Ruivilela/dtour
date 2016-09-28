class SearchesController < ApplicationController
  def pick_location
  end

  def show_search_results
  end

  def band_search_result
    if user_signed_in? && current_user.id.to_s == params[:id].to_s
        redirect_to '/band/page/' + params[:id]
    else
      @band = Band.find_by(id: params[:id])
      @tourdate = TourDate.where(band_id: params[:id]).all
    end
  end
end
