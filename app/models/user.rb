class User < ApplicationRecord
  has_one :band
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable :trackable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  after_create :create_band_object

  private
  def create_band_object
    Band.create(user_id: User.last.id)
  end
end
