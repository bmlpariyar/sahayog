class ContributionsController < ApplicationController
  before_action :set_project, only: %i[new]
  before_action :authenticate_user!

  def new
    @contribution = @project.contributions.new
  end

  def create
    @project = Project.find(params[:contribution][:project_id].to_i)
    @contribution = @project.contributions.new(contributions_params)
    @contribution.user = current_user

    if @contribution.save
      redirect_to @project, notice: "Contribution was successfully created"
    else
      render :new, status: :unprocessable_entity, alert: "#{@contribution.errors.full_messages}"
    end
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def contributions_params
    params.require(:contribution).permit(:amount, :comment, :project_id)
  end
end
