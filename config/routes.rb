DemoRailsAngularjs::Application.routes.draw do




  devise_for :users, :skip => :all

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      devise_scope :user do

        post 'login' => 'sessions#create', :as => 'login'
        #IE8 cannot use Angulars $http.delete() call, at present to keep to post on named route.
        #delete 'sessions' => 'sessions#destroy', :as => 'session_logout'
        post 'logout' => 'sessions#destroy', :as => 'logout'

        get 'current_user' => 'users#show_current_user', :as => 'show_current_user'
      end
      resources :sites

      get 'info' => 'info#index', :as=>'info'
    end
  end

  ActiveAdmin.routes(self)

  devise_for :admin_users, ActiveAdmin::Devise.config

  #TODO remove this. Reason: if user is in angular app e.g. at /info
  # and reloads, rails is trying to pick that route up.
  # If behind nginx, possible rewrite all to index would solve... smells bad though.
  match "*path" =>  'home#index', :as =>'catchall'

  root :to => "home#index"

end
