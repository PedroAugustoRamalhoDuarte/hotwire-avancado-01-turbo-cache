class StocksController < ApplicationController
  def index
    sleep 5 if params[:sleep].present?
    @stocks = Stock.order(:ticker)
  end

  def show
    @stock = Stock.find_by!(ticker: params[:ticker])
  end
end
