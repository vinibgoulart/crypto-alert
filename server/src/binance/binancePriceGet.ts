import { binanceApi } from "./binanceApi.js";

type BinancePriceGetArgs = {
  symbol: string;
  currency: string;
};

type BinanceTickerPriceResponse = {
  symbol: string;
  price: string;
};

type BinancePriceGetSuccess = {
  success: true;
  data: BinanceTickerPriceResponse;
};

type BinancePriceGetError = {
  success: false;
  error: string;
};

export type BinancePriceGetResponse =
  | BinancePriceGetSuccess
  | BinancePriceGetError;

export const binancePriceGet = async ({
  symbol,
  currency,
}: BinancePriceGetArgs): Promise<BinancePriceGetResponse> => {
  const queryParams = new URLSearchParams({
    symbol: `${symbol.toUpperCase()}${currency}`,
  });

  const result = await binanceApi<BinanceTickerPriceResponse>(
    `/ticker/price?${queryParams.toString()}`
  );

  if (result.success) {
    return result;
  }

  return {
    success: false,
    error: result.error,
  };
};
