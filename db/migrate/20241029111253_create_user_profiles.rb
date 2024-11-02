class CreateUserProfiles < ActiveRecord::Migration[7.2]
  def change
    create_table :user_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.text :bio
      t.string :address
      t.string :website
      t.json :social_links
      t.string :display_name

      t.timestamps
    end
  end
end
