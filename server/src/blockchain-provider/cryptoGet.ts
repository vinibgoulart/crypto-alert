import { binanceCryptoGet } from "../binance/binanceCryptoGet.js";

type CryptoGetArgs = {
  symbol: string;
};

type CryptoGet = {
  symbol: string;
  price: string;
  date: string;
};

type CryptoGetSuccess = {
  success: true;
  crypto: CryptoGet;
};

type CryptoGetError = {
  success: false;
  error: string;
};

export type CryptoGetResponse = CryptoGetSuccess | CryptoGetError;

export const cryptoGet = async ({
  symbol,
}: CryptoGetArgs): Promise<CryptoGetResponse> => {
  const binanceCrypto = await binanceCryptoGet({ symbol });

  if (!binanceCrypto.success) {
    return {
      success: false,
      error: binanceCrypto.error,
    };
  }

  return {
    success: true,
    crypto: {
      symbol: binanceCrypto.price.symbol,
      price: binanceCrypto.price.price,
      date: new Date().toISOString(),
    },
  };
};
