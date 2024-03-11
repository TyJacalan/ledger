class Task < ApplicationRecord
  belongs_to :category
  belongs_to :user
  
  validates :name, presence: true, length: { maximum: 25 }
  validates :description, length: { maximum: 250 }
  validate :due_date_must_be_greater_than_the_present

  def formatted_due_date
    due_date.strftime("%b %d")
  end

  private

  def due_date_must_be_greater_than_the_present
    errors.add(:due_date, "must be greater than the present") if due_date.present? && due_date < Date.today
  end

end
