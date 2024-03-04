class HomeController < ApplicationController
  def index
    @categories = current_user.categories
    @tasks = current_user.tasks
    
    @category = Category.new
    @task = Task.new

    @due_dates = current_user.tasks.distinct.pluck(:due_date)
  end
end
