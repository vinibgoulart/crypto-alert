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
  price: BinanceTickerPriceResponse;
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
    return {
      success: true,
      price: result.data,
    };
  }

  return {
    success: false,
    error: result.error,
  };
};
