class Contribution < ApplicationRecord
  belongs_to :user
  belongs_to :project
  validate :does_not_exceed_project_goal

  private

  def does_not_exceed_project_goal
    if project.present? && (project.contributions.sum(:amount) + amount > project.amount)
      max_contribution = project.amount - project.contributions.sum(:amount)
      errors.add(:amount, "exceeds the goal amount. You can contribute a maximum of Rs. #{max_contribution}")
    end
  end
end
