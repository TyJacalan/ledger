require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:example)
    sign_in @user
    @category = Category.create(name: "Test", user_id: @user.id)
    @task = Task.create(name: "Test", category_id: @category.id, due_date: Date.today + 1, user_id: @user.id)
  end

  test "should create task" do
    assert_difference('Task.count') do
      post user_tasks_url(@user), params: { task: { name: "New Task", category_id: @category.id, due_date: Date.today + 1, user_id: @user.id } }
    end
  end

 test "should update task" do
    patch user_task_url(@user, @task), params: { task: { name: "Edited Task" } }
    assert_redirected_to root_path #
    @task.reload
    assert_equal "Edited Task", @task.name
  end

 test "should destroy task" do
   assert_difference('Task.count', -1) do
     delete user_task_url(@user, @task)
   end

   assert_redirected_to root_path
   assert_not Task.exists?(@task.id), "Task should be deleted"
 end
end
