import { binanceApi } from "./binanceApi.js";

type BinancePriceGetArgs = {
  symbol: string;
  currency: string;
};

export const binancePriceGet = ({ symbol, currency }: BinancePriceGetArgs) => {
  const queryParams = new URLSearchParams({
    symbol: `${symbol}${currency}`,
  });

  return binanceApi(`/ticker/price?${queryParams.toString()}`);
};
