class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :intercept_html_requests

  layout :nil



  #skip_before_filter :verify_authenticity_token, :only => [:options]

  #before_filter :cors_set_access_control_headers
  #before_filter :authenticate_cors_user


  private
  #def authenticate_cors_user
  #  if request.xhr? && !user_signed_in?
  #    error = { :error => "You must be logged in." }
  #    render :json => error, :status => 401
  #  end
  #end

  #def cors_set_access_control_headers
  #  headers['Access-Control-Allow-Origin'] = 'http://localhost'
  #  headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
  #  headers['Access-Control-Allow-Headers'] = '*, X-Requested-With, X-Prototype-Version, X-CSRF-Token, Content-Type'
  #  headers['Access-Control-Max-Age'] = "1728000"
  #end
  #
  def options
    render :text => '', :content_type => 'text/plain'
  end


  def intercept_html_requests
    render('layouts/application') if request.format == Mime::HTML
  end

  def skip_trackable
    request.env['devise.skip_trackable'] = true
  end

end
