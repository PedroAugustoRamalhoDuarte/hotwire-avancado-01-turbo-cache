class CreateStocks < ActiveRecord::Migration[8.1]
  def change
    create_table :stocks do |t|
      t.string :ticker
      t.string :name
      t.decimal :price
      t.decimal :change_percent
      t.integer :volume

      t.timestamps
    end
  end
end
