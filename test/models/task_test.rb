require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @user = users(:example)
    @category = Category.new(name: "Test", user_id: @user.id)
  end

  test "should not save task without name" do
    task = Task.new(category: @category)
    assert_not task.save, "Saved the task without a name"
  end

  test "should save task with valid attributes" do
    task = Task.new(name: "Example Task", user: @user, category: @category)
    assert task.save, "Did not save the task with valid attributes"
  end

  test "should not save task with long name" do
    long_name = "a" * 26
    task = Task.new(name: long_name, user: @user, category: @category)
    assert_not task.save, "Saved the task with a long name"
  end

  test "should save task without description" do
    task = Task.new(name: "Example Task", user: @user, category: @category)
    assert task.save, "Did not save the task without a description"
  end

  test "should not save task with long description" do
    long_description = "a" * 251
    task = Task.new(name: "Example Task", description: long_description, user: @user, category: @category)
    assert_not task.save, "Saved the task with a long description"
  end

  test "should not save task with past due date" do
    past_due_date = Date.today - 1.day
    task = Task.new(name: "Example Task", due_date: past_due_date, user: @user, category: @category)
    assert_not task.save, "Saved the task with a past due date"
  end

  test "should save task with future due date" do
    future_due_date = Date.today + 1.day
    task = Task.new(name: "Example Task", due_date: future_due_date, user: @user, category: @category)
    assert task.save, "Did not save the task with a future due date"
  end
end
