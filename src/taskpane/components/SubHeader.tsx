import * as React from "react";
import { Button, ButtonType } from "office-ui-fabric-react";
import { Stock } from "../../api/stocks";

interface SubHeaderProps {
  stocks: Stock[];
  loadStocks: () => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ stocks, loadStocks }: SubHeaderProps) => {
  return (
    <h2 className="subHeader">
      <span>
        Stocks <small>[ {stocks.length} ]</small>
      </span>
      {stocks.length > 0 && (
        <Button className="btnReloadStocks" buttonType={ButtonType.hero} onClick={loadStocks}>
          Reload
        </Button>
      )}
    </h2>
  );
};

export default SubHeader;
