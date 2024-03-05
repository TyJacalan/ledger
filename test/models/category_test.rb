require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  test "should not save category without name" do
    category = Category.new(user_id: users(:example).id)
    assert_not category.save, "Saved the category without a name."
  end

  test "should not save duplicate category" do
    category1 = Category.new(name: "Test", user_id: users(:example).id)
    category2 = Category.new(name: "Test", user_id: users(:example).id)

    assert category1.save
    assert_not category2.save, "Saved the duplicate category."
  end
    

  test "should save category" do
    category = Category.new(name: "Test", user_id: users(:example).id)
    assert category.save, "Saved the category successfully."
  end
end

