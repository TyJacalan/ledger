FactoryBot.define do
  factory :task do
    name { "MyString" }
    description { "MyText" }
    category { nil }
    due_date { "2024-03-11" }
    status { false }
    user { nil }
  end
end
