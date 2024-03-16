require 'rails_helper'

RSpec.describe User, type: :model do
  describe "user exists" do
    it "is successful" do
      user = create(:user)
      expect(user).to be_valid
    end
  end

  describe "associations" do
    it "should have many categories" do
      c = User.reflect_on_association(:categories)
      expect(c.macro).to eq(:has_many)
    end

    it "should have many tasks" do
      t = User.reflect_on_association(:tasks)
      expect(t.macro).to eq(:has_many)
    end
  end
end
