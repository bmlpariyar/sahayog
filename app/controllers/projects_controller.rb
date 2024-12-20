class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show edit update destroy ]
  # before_action :authenticate_user!, except: %i[index show]
  protect_from_forgery with: :null_session

  # GET /projects or /projects.json
  def index
    @projects = Project.all.order(created_at: :desc)
  end

  # GET /projects/1 or /projects/1.json
  def show
    @user_profile = @project.user.user_profile
    @contributions = @project.contributions
  end

  # GET /projects/new
  def new
    @project = Project.new
    @categories = Category.all
  end

  # GET /projects/1/edit
  def edit
    @categories = Category.all
  end

  # POST /projects or /projects.json
  def create
    @project = Project.new(project_params)
    @project.user = current_user
    respond_to do |format|
      if @project.save
        format.html { redirect_to @project, notice: "Project was successfully  created." }
        format.json { render :show, status: :created, location: @project }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, alert: "Project was successfully updated." }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    @project.destroy!

    respond_to do |format|
      format.html { redirect_to projects_path, status: :see_other, notice: "Project was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def add_or_remove_support
    project = Project.find(params[:id])
    support = Support.find_by(user: current_user, project: project)

    if support
      support.destroy
      render json: { success: true, supported: false }, status: :ok
    else
      Support.create!(user: current_user, project: project)
      render json: { success: true, supported: true }, status: :ok
    end
  rescue ActiveRecord::RecordNotFound
    render json: { success: false, error: "Project not found" }, status: :not_found
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:title, :description, :amount, :category_id, :cover_image, :video, :links, images: [])
  end
end
