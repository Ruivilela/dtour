class Band < ApplicationRecord
  belongs_to :user
  has_many :tour_dates
end
