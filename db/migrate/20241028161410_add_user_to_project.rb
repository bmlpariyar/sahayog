class AddUserToProject < ActiveRecord::Migration[7.2]
  def change
    add_reference :projects, :user, foreign_key: true, index: true
  end
end
