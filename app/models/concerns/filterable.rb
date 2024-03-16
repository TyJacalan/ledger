module Filterable
  extend ActiveSupport::Concern

  module ClassMethods
    def filter(filtering_params, user)
      results = user.tasks.where(nil)
      filtering_params.each do |key, value|
        results = results.public_send("filter_by_#{key}", value, user) if value.present?
      end
      results
    end
  end
end
