import { ALERT_STATUS_ENUM, ALERT_TARGET_ENUM } from "@crypto-alert/enum";
import { AlertDocument, AlertModel } from "./alertModel";
import { UserDocument } from "@crypto-alert/user";
import { getObjectId } from "@crypto-alert/mongo";
import { CryptoModel } from "@crypto-alert/crypto";

type AlertCreateArgs = {
  price: number;
  symbol: string;
  status: ALERT_STATUS_ENUM;
  user: UserDocument;
};

type AlertCreateSuccess = {
  success: true;
  alert: AlertDocument;
};

type AlertCreateError = {
  success: false;
  error: string;
};

type AlertCreateResponse = AlertCreateSuccess | AlertCreateError;

export const alertCreate = async (
  alertPayload: AlertCreateArgs
): Promise<AlertCreateResponse> => {
  const alertExistent = await AlertModel.findOne({
    price: alertPayload.price,
    symbol: alertPayload.symbol,
    status: alertPayload.status,
    userId: getObjectId(alertPayload.user._id),
  });

  if (alertExistent) {
    return {
      success: false,
      error: "Alert already exists",
    };
  }

  const crypto = await CryptoModel.findOne({ symbol: alertPayload.symbol });

  if (!crypto) {
    return {
      success: false,
      error: "Crypto not found",
    };
  }

  const alert = await AlertModel.create({
    ...alertPayload,
    initialPrice: crypto.price,
    target:
      Number(alertPayload.price) > Number(crypto.price)
        ? ALERT_TARGET_ENUM.HIGHER
        : ALERT_TARGET_ENUM.LOWER,
    userId: getObjectId(alertPayload.user._id),
  });

  return {
    success: true,
    alert,
  };
};
