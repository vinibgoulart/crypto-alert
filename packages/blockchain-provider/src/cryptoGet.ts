import { binanceCryptoGet } from "@crypto-alert/blockchain-binance";

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

type CryptoGetResponse = CryptoGetSuccess | CryptoGetError;

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

  if (Array.isArray(binanceCrypto.cryptos)) {
    return {
      success: false,
      error: "Crypto not found",
    };
  }

  return {
    success: true,
    crypto: {
      symbol: binanceCrypto.cryptos.symbol,
      price: binanceCrypto.cryptos.price,
      date: new Date().toISOString(),
    },
  };
};
