import { AlertDocument } from "@crypto-alert/alert";
import { CryptoModel } from "@crypto-alert/crypto";

export const alertMapper = async (alert: AlertDocument) => {
  const currentPrice = await CryptoModel.findOne({
    symbol: alert.symbol,
  });

  const differencePrice = (
    alert.price - (Number(currentPrice?.price) ?? 0)
  ).toFixed(2);

  return {
    _id: alert._id,
    price: alert.price,
    symbol: alert.symbol,
    status: alert.status,
    currentPrice: currentPrice?.price ?? "0",
    differencePrice: String(differencePrice),
    reachedPrice: alert.reachedPrice,
    initialPrice: alert.initialPrice,
    target: alert.target,
    reachedAt: alert.reachedAt,
    createdAt: alert.createdAt,
  };
};
