# frozen_string_literal: true

class PopoverComponent < ViewComponent::Base
  renders_one :button
  renders_one :body

  def initialize(placement: "bottom-end")
    @placement = placement
    super()
  end

  private

  attr_reader :placement
end
