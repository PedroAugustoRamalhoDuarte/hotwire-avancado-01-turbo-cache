# frozen_string_literal: true

class PopoverComponent < ViewComponent::Base
  renders_one :button
  renders_one :body

  def initialize(placement: "bottom-end", dismiss_outside: true)
    @placement = placement
    @dismiss_outside = dismiss_outside
    super()
  end

  private

  attr_reader :placement, :dismiss_outside
end
