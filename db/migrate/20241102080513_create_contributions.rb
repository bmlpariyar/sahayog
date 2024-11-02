class CreateContributions < ActiveRecord::Migration[7.2]
  def change
    create_table :contributions do |t|
      t.decimal :amount
      t.boolean :payment_status, default: false
      t.references :user, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
