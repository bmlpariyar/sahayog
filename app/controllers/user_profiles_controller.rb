class UserProfilesController < ApplicationController
  before_action :set_current_user
  before_action :set_user_profile, only: %i[edit update]

  def index
    @user_profile = UserProfile.find_by(user_id: @user.id)
  end

  def edit
  end

  def show
  end

  def update
    if @user_profile.update(user_profile_params)
      redirect_to user_profiles_path
    else
      render :edit, status: :unprocessable_entity, alert: "#{@user_profile.errors.full_messages}"
    end
  end

  private

  def set_current_user
    @user = current_user
  end

  def set_user_profile
    @user_profile = UserProfile.find(params[:id])
  end

  def user_profile_params
    params.require(:user_profile).permit(:avatar, :bio, :address, :website, :social_links, :display_name)
  end
end
