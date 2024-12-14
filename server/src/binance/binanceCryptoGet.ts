import { binanceApi } from "./binanceApi.js";

type BinanceCryptoGetArgs = {
  symbol?: string;
};

type BinanceTickerCryptoResponse = {
  symbol: string;
  price: string;
};

type BinanceCryptoGetSuccess = {
  success: true;
  price: BinanceTickerCryptoResponse;
};

type BinanceCryptoGetError = {
  success: false;
  error: string;
};

export type BinanceCryptoGetResponse =
  | BinanceCryptoGetSuccess
  | BinanceCryptoGetError;

export const binanceCryptoGet = async ({
  symbol,
}: BinanceCryptoGetArgs): Promise<BinanceCryptoGetResponse> => {
  const getQueryParams = () => {
    if (!symbol) {
      return "";
    }

    return new URLSearchParams({
      symbol: symbol.toUpperCase(),
    }).toString();
  };
  const queryParams = getQueryParams();

  const result = await binanceApi<BinanceTickerCryptoResponse>(
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
