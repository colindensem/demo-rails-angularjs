class Api::V1::InfoController < ApplicationController

    #PUBLIC API
    #before_filter :authenticate_user!

    def index

      render :status => 200,
             :json => { :success => true,
                        :info => "About Project",
                        :data => { :author => 'Colin Densem',
                                :angular_js => 'seems to work'} }
    end
end
