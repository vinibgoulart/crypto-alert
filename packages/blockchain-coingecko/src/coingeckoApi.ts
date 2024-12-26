type CoinGeckoApiSuccess<T> = {
  success: true;
  data: T;
};

type CoinGeckoApiError = {
  success: false;
  error: string;
};

type CoinGeckoApiResponse<T> = CoinGeckoApiSuccess<T> | CoinGeckoApiError;

export const coingeckoApi = async <T>(
  endpoint: string,
  init?: RequestInit
): Promise<CoinGeckoApiResponse<T>> => {
  try {
    const result = await fetch(
      `https://api.coingecko.com/api/v3${endpoint}`,
      init
    );
    const data = await result.json();

    if (!result.ok) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
};
