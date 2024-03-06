require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:example)
    sign_in @user
    @category = Category.create(name: "Test", user_id: @user.id)
  end

  test "should create category" do
    assert_difference('Category.count') do
      post user_categories_url(@user), params: { category: { name: "New Category", user_id: @user.id } }
    end
  end

 test "should update category" do
    patch user_category_url(@user, @category), params: { category: { name: "Edited Category" } }
    assert_redirected_to root_path #
    @category.reload
    assert_equal "Edited Category", @category.name
  end

 test "should destroy category" do
   assert_difference('Category.count', -1) do
     delete user_category_url(@user, @category)
   end

   assert_redirected_to root_path
   assert_not Category.exists?(@category.id), "Category should be deleted"
 end
end
