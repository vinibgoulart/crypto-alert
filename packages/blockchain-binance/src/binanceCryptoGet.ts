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
  cryptos: BinanceTickerCryptoResponse | BinanceTickerCryptoResponse[];
};

type BinanceCryptoGetError = {
  success: false;
  error: string;
};

type BinanceCryptoGetResponse = BinanceCryptoGetSuccess | BinanceCryptoGetError;

export const binanceCryptoGet = async (
  args?: BinanceCryptoGetArgs
): Promise<BinanceCryptoGetResponse> => {
  const getQueryParams = () => {
    if (!args?.symbol) {
      return "";
    }

    return new URLSearchParams({
      symbol: args?.symbol.toUpperCase(),
    }).toString();
  };
  const queryParams = getQueryParams();

  const result = await binanceApi<BinanceCryptoGetSuccess["cryptos"]>(
    `/ticker/price?${queryParams.toString()}`
  );

  if (result.success) {
    if (Array.isArray(result.data)) {
      return {
        success: true,
        cryptos: result.data,
      };
    }

    return {
      success: true,
      cryptos: result.data,
    };
  }

  return {
    success: false,
    error: result.error,
  };
};
