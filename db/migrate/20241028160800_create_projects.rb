class CreateProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.decimal :amount
      t.references :category, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :video
      t.text :links
      t.timestamps
    end
  end
end
