type BinanceApiSuccess<T> = {
  success: true;
  data: T;
};

type BinanceApiError = {
  success: false;
  error: string;
};

export type BinanceApiResponse<T> = BinanceApiSuccess<T> | BinanceApiError;

export const binanceApi = async <T>(
  endpoint: string,
  init?: RequestInit
): Promise<BinanceApiResponse<T>> => {
  try {
    const result = await fetch(
      `https://api.binance.com/api/v3${endpoint}`,
      init
    );
    const data = await result.json();

    if (!result.ok) {
      return {
        success: false,
        error: data.msg,
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
