const ENDPOINT = 'https://financialmodelingprep.com/api/v3/company/stock/list';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  exchange: string;
}

export const getStocks = async () => {
  try {
    const r = await fetch(ENDPOINT);
    if( !r.ok ) throw new Error('Failed to fetch');

    const { symbolsList } = await r.json();

    const stocks: Stock[] = symbolsList.filter((s: Stock) => {
      const hasName = s.name != null && s.name !== '';
      const hasPrice = s.price != null && s.price > 0;
      return hasName && hasPrice;
    })

    return stocks.sort((a, b) => b.price - a.price);

  } catch( error ){
    return [error.message];
  }
}
