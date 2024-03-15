class CategoriesController < ApplicationController
  before_action :set_category, only: [:edit, :update]

  def create
    @category = current_user.categories.build(category_params)
    if @category.save
      redirect_to root_path, notice: "Category was successfully created"
    else
      redirect_to root_path, alert: "Something went wrong!"
    end
  end

  def edit
    render turbo_stream:
      turbo_stream.replace(
        "categoryItem#{@category.id}",
        partial: 'home/category/edit'
      )
  end

  def update
    if @category.update(category_params)
      redirect_to root_path, notice: "Category was successfully updated"
    else
      redirect_to root_path, alert: "Something went wrong"
    end
  end

  private

  def set_category
    @category = current_user.categories.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :user_id)
  end
end
