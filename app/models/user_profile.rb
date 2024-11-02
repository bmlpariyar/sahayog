class UserProfile < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar

  validates :bio, length: { maximum: 1000 }, allow_nil: true
  validates :display_name, length: { maximum: 50 }, allow_nil: true
  validates :address, length: { maximum: 100 }, allow_nil: true
  validates :avatar, content_type: ["image/png", "image/jpeg", "image/jpg"],
                     size: { less_than: 5.megabytes },
                     allow_blank: true

  def default_social_links
    {
      twitter: nil,
      linkedin: nil,
      github: nil,
      instagram: nil,
    }
  end

  def social_links
    super || default_social_links
  end
end
