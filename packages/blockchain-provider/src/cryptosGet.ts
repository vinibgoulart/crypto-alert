import { binanceCryptoGet } from "@crypto-alert/blockchain-binance";

type CryptosGet = {
  symbol: string;
  price: string;
};

type CryptosGetSuccess = {
  success: true;
  cryptos: CryptosGet[];
};

type CryptosGetError = {
  success: false;
  error: string;
};

type CryptosGetResponse = CryptosGetSuccess | CryptosGetError;

export const cryptosGet = async (): Promise<CryptosGetResponse> => {
  const binanceCryptos = await binanceCryptoGet();

  if (!binanceCryptos.success) {
    return {
      success: false,
      error: binanceCryptos.error,
    };
  }

  if (!Array.isArray(binanceCryptos.cryptos)) {
    return {
      success: false,
      error: "Cryptos not found",
    };
  }

  const cryptos = binanceCryptos.cryptos.map((crypto) => ({
    symbol: crypto.symbol,
    price: crypto.price,
  }));

  return {
    success: true,
    cryptos,
  };
};
