class Task < ApplicationRecord
  include Filterable

  belongs_to :category
  belongs_to :user
  
  validates :name, presence: true, length: { maximum: 25 }
  validates :description, length: { maximum: 250 }
  validate :due_date_must_be_greater_than_the_present

  scope :filter_by_category, -> (category, user) { where(category_id: category, user_id: user.id) }
  scope :filter_by_due_date, -> (due_date) { where(due_date: due_date, user_id: user.id) }

  def formatted_due_date
    due_date.strftime("%b %d")
  end

  private

  def due_date_must_be_greater_than_the_present
    errors.add(:due_date, "must be greater than the present") if due_date.present? && due_date < Date.today
  end

end
