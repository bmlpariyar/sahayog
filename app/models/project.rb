class Project < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :contributions, dependent: :destroy

  has_one_attached :cover_image
  has_many_attached :images
end
