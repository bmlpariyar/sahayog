class AddCommentToContribution < ActiveRecord::Migration[7.2]
  def change
    add_column :contributions, :comment, :text
  end
end
