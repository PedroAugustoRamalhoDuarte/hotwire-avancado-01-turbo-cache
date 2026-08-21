# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The data here can be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

stocks = [
  { ticker: "AAPL",  name: "Apple Inc.",         price: 232.15, change_percent: 1.24,  volume: 52_400_000 },
  { ticker: "MSFT",  name: "Microsoft Corp.",    price: 428.90, change_percent: -0.56, volume: 18_900_000 },
  { ticker: "GOOGL", name: "Alphabet Inc.",      price: 178.44, change_percent: 0.87,  volume: 24_100_000 },
  { ticker: "AMZN",  name: "Amazon.com Inc.",    price: 201.30, change_percent: -1.12, volume: 31_700_000 },
  { ticker: "NVDA",  name: "NVIDIA Corp.",       price: 134.81, change_percent: 3.45,  volume: 289_500_000 },
  { ticker: "META",  name: "Meta Platforms Inc.", price: 585.12, change_percent: 0.42,  volume: 15_200_000 },
  { ticker: "TSLA",  name: "Tesla Inc.",         price: 338.67, change_percent: -2.18, volume: 98_300_000 },
  { ticker: "KO",    name: "Coca-Cola Co.",      price: 62.84,  change_percent: 0.15,  volume: 12_800_000 }
]

stocks.each do |attributes|
  Stock.find_or_create_by!(ticker: attributes[:ticker]) do |stock|
    stock.assign_attributes(attributes.except(:ticker))
  end
end
