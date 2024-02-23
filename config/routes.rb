Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
  
  resources :users, only: [:edit, :update, :destroy] do
    resources :categories
    resources :tasks
  end

end
