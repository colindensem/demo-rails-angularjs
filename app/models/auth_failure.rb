class AuthFailure < Devise::FailureApp
  def respond
    if request.format
      json_failure
    else
      super
    end
  end

  def json_failure
    self.status = 401
    self.content_type = 'json'
    self.response_body = '{ "success": "false",
                            "info": "Login Failed"
                           }'
  end
end