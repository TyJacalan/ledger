class HomeController < ApplicationController
  def index
    @categories = current_user.categories
    @tasks = current_user.tasks
    
    @category = Category.new
    @task = Task.new
  end
end
