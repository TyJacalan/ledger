class CategoriesController < ApplicationController
  def create
    @category = current_user.categories.build(category_params)
    if @category.save
      redirect_to root_path, notice: "Category was successfully created"
    else
      redirect_to root_path, alert: "Something went wrong!"
    end
  end

  private
  def category_params
    params.require(:category).permit(:name, :user_id)
  end
end
