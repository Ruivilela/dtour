class SearchesController < ApplicationController
  def pick_location
  end

  def show_search_results
  end

  def band_search_result
    if current_user.id.to_s == params[:id].to_s
      redirect_to '/band/page/' + params[:id]
    else
      @band = Band.find_by(id: params[:id])
    end
  end
end
