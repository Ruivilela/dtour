class CreateTourDates < ActiveRecord::Migration[5.0]
  def change
    create_table :tour_dates do |t|
      t.date :date
      t.string :Longitude
      t.string :Latitude
      t.string :address
      t.belongs_to :band, index: true, unique: true, foreign_key: true

      t.timestamps
    end
  end
end
