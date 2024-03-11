Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check
  
  resources :categories
  resources :tasks

  root "home#index"
end
