class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  has_many :projects, dependent: :destroy
  has_one :user_profile
  has_many :contributions, dependent: :destroy

  enum :role, { user: 0, admin: 1 }
  after_initialize :set_default_role, if: :new_record?
  after_create :create_user_profile

  def set_default_role
    self.role ||= :user
  end

  def admin?
    role == "admin"
  end

  def create_user_profile
    user_profile = UserProfile.new(user: self)
    Rails.logger.error("User data: #{user_profile}")
    unless user_profile.save
      Rails.logger.error("UserProfile creation failed: #{user_profile.errors.full_messages.join(", ")}")
    end
  end
end
