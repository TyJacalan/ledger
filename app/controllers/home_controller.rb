class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @categories = current_user.categories
    @tasks = current_user.tasks
    @due_dates = current_user.tasks.distinct.pluck(:due_date)

    if params[:due_date].present?
      @tasks = @tasks.where(due_date: params[:due_date])
    end

    @category = Category.new
    @task = Task.new

  end
end

