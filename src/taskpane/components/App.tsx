import * as React from "react";
import { Button, ButtonType } from "office-ui-fabric-react";
import Progress from "./Progress";
import { Spinner, SpinnerType } from "office-ui-fabric-react";
/* global Button, console, Excel, Progress */

import { Stock, getStocks } from "../../api/stocks";
import SubHeader from "./SubHeader";
import SearchBox from "./SearchBox";
import StockRow from "./StockRow";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  loading: boolean;
  error: string;
  stocks: Stock[];
  max: number;
  search: string;
}

const defaultState = {
  loading: false,
  error: "",
  stocks: [],
  max: 100,
  search: ""
};

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = { ...defaultState };
  }

  loadStocks = async () => {
    this.setState({ loading: true });

    try {
      await Excel.run(async context => {
        const stocks: Stock[] = await getStocks();
        this.setState({ stocks, loading: false });
        await context.sync();
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  showMore = () => {
    this.setState(state => ({ max: state.max + defaultState.max }));
  };

  setSearch = (ev: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ search: ev.currentTarget.value });
  };

  render() {
    const { title, isOfficeInitialized } = this.props;
    if (!isOfficeInitialized) {
      return <Progress title={title} message="Please sideload your addin to see app body." />;
    }

    const { loading, error, stocks, max, search } = this.state;

    const stocksMatched = stocks.filter(s => {
      const rx = new RegExp(search, "i");
      return s.name.match(rx) || s.symbol.match(rx);
    });

    const isBlank = stocks.length === 0 && !loading;
    const canShowMore = !loading && stocksMatched.length > max;

    return (
      <div className="synergiesAddin">
        <SubHeader stocks={stocks} loadStocks={this.loadStocks} />
        {stocks.length > 0 && <SearchBox value={search} onChange={this.setSearch} />}

        {loading && <Spinner type={SpinnerType.large} label={"Loading..."} />}

        {error !== "" && <div className="error">{error}</div>}

        {isBlank && (
          <Button className="btnLoadStocks" buttonType={ButtonType.hero} onClick={this.loadStocks}>
            Load Stocks Prices
          </Button>
        )}

        {!isBlank && (
          <>
            {stocksMatched.slice(0, max).map(s => (
              <StockRow key={s.symbol} stock={s} />
            ))}

            {canShowMore && (
              <Button className="btnShowMore" buttonType={ButtonType.hero} onClick={this.showMore}>
                Show more...
              </Button>
            )}
          </>
        )}
      </div>
    );
  }
}
