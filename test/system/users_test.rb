require "application_system_test_case"

class UsersTest < ApplicationSystemTestCase
  test "sign in" do
    visit new_user_session_url

    fill_in "user_email", with: "example@example.com"
    fill_in "user_password", with: "password123"
    click_on "Log in"

    visit root_url

    assert_selector "main"
  end
end
