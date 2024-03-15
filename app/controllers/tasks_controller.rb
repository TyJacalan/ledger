class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  
  def index 
    @tasks = current_user.tasks
  end

  def show
    @task = current_user.tasks.find(params[:id])
    render turbo_stream:
      turbo_stream.replace(
        'taskList',
        partial: 'home/task/taskItem'
      )
  end

  def new
    @task = current_user.tasks.new
  end

  def create
    @task = current_user.tasks.build(task_params)
    if @task.save
      redirect_to root_path, notice: 'Task was successfully created'
    else
      redirect_to root_path, alert: 'Something went wrong!'
    end
  end

  def edit
    render turbo_stream:
      turbo_stream.replace(
        'taskList',
        partial: 'home/task/edit'
      )
  end

  def update
    if @task.update(task_params)
      redirect_to root_path, notice: 'Task was successfully updated.'
    else
      redirect_to root_path, alert: 'Something went wrong!'
    end
  end

  def destroy 
    @task.destroy

    render turbo_stream: turbo_stream.remove("taskListItem#{@task.id}")
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :due_date, :status, :category_id, :user_id)
  end
end
