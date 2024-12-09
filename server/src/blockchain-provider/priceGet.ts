import { binancePriceGet } from "../binance/binancePriceGet.js";

type PriceGetArgs = {
  symbol: string;
};

export const priceGet = ({ symbol }: PriceGetArgs) => {
  return binancePriceGet({ symbol: symbol.toUpperCase(), currency: "USDT" });
};
