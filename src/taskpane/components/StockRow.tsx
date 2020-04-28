import * as React from "react";
import { Stock } from "../../api/stocks";
import formatCurrency from "../../helpers/currency";

interface StockRowProps {
  stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }: StockRowProps) => {
  return (
    <div className="stockRow" key={stock.symbol}>
      <h3 className="name">{stock.name}</h3>
      <span className="price">{formatCurrency(stock.price)}</span>
    </div>
  );
};

export default StockRow;
