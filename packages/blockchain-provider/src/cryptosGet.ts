import { coingeckoCryptoGet } from "@crypto-alert/blockchain-coingecko";

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
  const coingeckoCryptos = await coingeckoCryptoGet();

  if (!coingeckoCryptos.success) {
    return {
      success: false,
      error: coingeckoCryptos.error,
    };
  }

  if (!Array.isArray(coingeckoCryptos.cryptos)) {
    return {
      success: false,
      error: "Cryptos not found",
    };
  }

  const cryptos = coingeckoCryptos.cryptos.map((crypto) => ({
    symbol: crypto.symbol,
    price: crypto.current_price,
  }));

  return {
    success: true,
    cryptos,
  };
};
