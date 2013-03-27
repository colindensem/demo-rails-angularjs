class Api::V1::SitesController < ApplicationController

  before_filter :skip_trackable
  before_filter :authenticate_user!


  def index
    @sites = Site.all
    render :status => 200,
           :json => { :success => true,
                   :info => "Sites List",
                   :data => @sites }
  end
end