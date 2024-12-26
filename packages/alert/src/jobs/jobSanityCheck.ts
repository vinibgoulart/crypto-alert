import {
  MAIN_QUEUE,
  QUEUE_CONTENT_NAME_ENUM,
  QueueContent,
} from "@crypto-alert/queues";
import { AlertDocument, AlertModel } from "../alertModel";
import { CryptoModel } from "@crypto-alert/crypto";
import { ALERT_STATUS_ENUM, ALERT_TARGET_ENUM } from "@crypto-alert/enum";
import { bulkWriteInBatches } from "@crypto-alert/mongo";
import { connectRabbitmq } from "@crypto-alert/rabbitmq";

type JobSanityCheckData = {
  symbol: string;
};

export const jobSanityCheck = async (
  content: QueueContent<JobSanityCheckData>
) => {
  if (content.name !== QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK) {
    throw new Error("Invalid job type");
  }

  if (!content.data?.symbol) {
    throw new Error("Invalid symbol");
  }

  const cryptoGetResponse = await CryptoModel.findOne({
    symbol: content.data.symbol,
  });

  if (!cryptoGetResponse) {
    throw new Error("Crypto not found");
  }

  const crypto = cryptoGetResponse;

  const alertsToUpdate = await AlertModel.aggregate([
    {
      $match: {
        symbol: crypto.symbol,
        status: ALERT_STATUS_ENUM.ACTIVE,
      },
    },
    {
      $addFields: {
        condition: {
          $cond: [
            { $eq: ["$target", ALERT_TARGET_ENUM.HIGHER] },
            { $gt: [crypto.price, "$price"] },
            { $lt: [crypto.price, "$price"] },
          ],
        },
      },
    },
    {
      $match: {
        condition: true,
      },
    },
  ]);

  const alertTransformFn = (alert: AlertDocument) => ({
    updateOne: {
      filter: { _id: alert._id },
      update: {
        status: ALERT_STATUS_ENUM.REACHED,
        reachedAt: new Date(),
        reachedPrice: crypto.price.toString(),
      },
    },
  });

  await bulkWriteInBatches<AlertDocument>(
    AlertModel,
    alertsToUpdate,
    alertTransformFn
  );

  for (const alert of alertsToUpdate) {
    const contentAlertReached: QueueContent = {
      name: QUEUE_CONTENT_NAME_ENUM.ALERT_REACHED,
      data: {
        _id: alert._id,
      },
    };

    const connection = await connectRabbitmq();
    const channel = await connection.createChannel();

    await channel.assertQueue(MAIN_QUEUE, { durable: true });

    channel.sendToQueue(
      MAIN_QUEUE,
      Buffer.from(JSON.stringify(contentAlertReached))
    );
  }
};
