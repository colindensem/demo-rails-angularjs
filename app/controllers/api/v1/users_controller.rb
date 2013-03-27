class Api::V1::UsersController < ApplicationController


  before_filter :skip_trackable
  before_filter :authenticate_user!

  def show_current_user
    render :status => 200,
           :json => { :success => true,
                      :info => "Current User",
                      :user => current_user,
                      :auth_token => current_user.authentication_token}

  end

end