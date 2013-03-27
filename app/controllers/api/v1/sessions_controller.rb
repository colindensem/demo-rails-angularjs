class Api::V1::SessionsController < Devise::SessionsController

  skip_before_filter :verify_authenticity_token,
                     :if => Proc.new  { |c| c.request.format == 'application/json' }
 respond_to :json

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    render :status => 200,
           :json => { :success => true,
                      :info => "Logged in",
                      :user => current_user,
                      :auth_token => current_user.authentication_token }
  end

  def destroy
    warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    current_user.update_column(:authentication_token, nil)
    sign_out
    render :status => 200,
           :json => { :success => true,
                      :info => "Logged out",
           }
  end

  def failure
    render :status => 401,
           :json => { :success => false,
                      :info => "Login Credentials Failed"
          }
  end


end