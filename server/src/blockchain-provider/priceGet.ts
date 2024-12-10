import { binancePriceGet } from "../binance/binancePriceGet.js";

type PriceGetArgs = {
  symbol: string;
};

type PriceGet = {
  symbol: string;
  price: string;
  date: string;
};

type PriceGetSuccess = {
  success: true;
  data: PriceGet;
};

type PriceGetError = {
  success: false;
  error: string;
};

export type PriceGetResponse = PriceGetSuccess | PriceGetError;

export const priceGet = async ({
  symbol,
}: PriceGetArgs): Promise<PriceGetResponse> => {
  const binancePrice = await binancePriceGet({ symbol, currency: "USDT" });

  if (!binancePrice.success) {
    return {
      success: false,
      error: binancePrice.error,
    };
  }

  return {
    success: true,
    data: {
      symbol: binancePrice.data.symbol,
      price: binancePrice.data.price,
      date: new Date().toISOString(),
    },
  };
};
