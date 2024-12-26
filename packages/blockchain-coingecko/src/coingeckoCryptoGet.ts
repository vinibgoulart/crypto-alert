import { coingeckoApi } from "./coingeckoApi.js";

type CoingeckoTickerCryptoResponse = {
  symbol: string;
  current_price: string;
};

type CoingeckoCryptoGetSuccess = {
  success: true;
  cryptos: CoingeckoTickerCryptoResponse | CoingeckoTickerCryptoResponse[];
};

type CoingeckoCryptoGetError = {
  success: false;
  error: string;
};

type CoingeckoCryptoGetResponse =
  | CoingeckoCryptoGetSuccess
  | CoingeckoCryptoGetError;

export const coingeckoCryptoGet =
  async (): Promise<CoingeckoCryptoGetResponse> => {
    const queryParams = new URLSearchParams({
      vs_currency: "usd",
      precision: "2",
      per_page: "250",
    }).toString();

    const result = await coingeckoApi<CoingeckoCryptoGetSuccess["cryptos"]>(
      `/coins/markets?${queryParams}`
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
