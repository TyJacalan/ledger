class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @categories = current_user.categories
    @tasks = Task.filter(params.slice(:category, :due_date), current_user)
    @due_dates = current_user.tasks.distinct.pluck(:due_date).map { |date| date.strftime("%b %d") }

    @category = Category.new
    @task = Task.new

  end
end

