class CreateSupports < ActiveRecord::Migration[7.2]
  def change
    create_table :supports do |t|
      t.references :project, null: false, foreign_key: true
      t.timestamps
    end
  end
end
