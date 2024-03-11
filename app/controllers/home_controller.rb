class HomeController < ApplicationController
  def index
    @categories = current_user.categories
    @tasks = current_user.tasks
    @due_dates = current_user.tasks.distinct.pluck(:due_date).map { |date| date.strftime("%b %d") }

    if(params[:due_date].present?)
       @tasks = @tasks.where(due_date: params[:due_date])
    end

    @category = Category.new
    @task = Task.new

  end
end
