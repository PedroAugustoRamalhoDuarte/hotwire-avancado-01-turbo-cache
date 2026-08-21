class StocksController < ApplicationController
  def index
    @stocks = Stock.order(:ticker)
  end

  def show
    @stock = Stock.find_by!(ticker: params[:ticker])
  end
end
