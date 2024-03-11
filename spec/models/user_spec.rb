require 'rails_helper'

RSpec.describe User, type: :model do
  describe "user exists" do
    it "is successful" do
      user = create(:user)
      expect(user).to be_valid
    end
  end
end
