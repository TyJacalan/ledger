class CategoriesController < ApplicationController
  
  def index
    @category = current_user.categories.all
  end

  def show
  end

  def new
    @category = current_user.categories.new
  end

  def create
    @category = current_user.categories.build(category_params)
    if @category.save
      redirect_to root_path, notice: "Category was successfully created."
    else 
      redirect_to root_path, alert: "Something went wrong!"
    end
  end

  def edit
  end

  def update
    if @category.update(category_params)
      redirect_to root_path, notice: "Category was successfully updated."
    else
      redirect_to root_path, alert: "Something went wrong!"
    end
  end

  def destroy
    @category.destroy
    redirect_to root_path, notice: "Category was successfully deleted."
  end

  private

  def set_category
    @category = current_user.categories.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end

