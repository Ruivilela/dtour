class CreateBands < ActiveRecord::Migration[5.0]
  def change
    create_table :bands do |t|
      t.string :name, default: ""
      t.text :about, default: ""
      t.integer :price, default:0
      t.integer :radius, default: 50
      t.text :requirements, default:""
      t.string :facebook, default:""
      t.string :twitter, default:""
      t.string :soundcloud, default:""
      t.string :spotify, default:""
      t.string :profile_pic, default:""
      t.belongs_to :user, index: true, unique: true, foreign_key: true

      t.timestamps
    end
  end
end
