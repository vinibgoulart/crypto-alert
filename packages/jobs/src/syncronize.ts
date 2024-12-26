import { cryptosGet } from "@crypto-alert/blockchain-provider";
import { CryptoDocument, CryptoModel } from "@crypto-alert/crypto";
import { bulkWriteInBatches, BulkWriteOperation } from "@crypto-alert/mongo";
import {
  MAIN_QUEUE,
  QUEUE_CONTENT_NAME_ENUM,
  QueueContent,
} from "@crypto-alert/queues";
import { connectRabbitmq } from "@crypto-alert/rabbitmq";

export const syncronize = async (content: QueueContent) => {
  if (content.name !== QUEUE_CONTENT_NAME_ENUM.SYNCRONIZE) {
    throw new Error("Invalid job type");
  }

  const cryptosGetResponse = await cryptosGet();

  if (!cryptosGetResponse.success) {
    throw new Error("Error getting cryptos: " + cryptosGetResponse.error);
  }

  const fetchedSymbols = new Set(
    cryptosGetResponse.cryptos.map((crypto) => crypto.symbol)
  );

  const cryptoTransformFn = (
    crypto: CryptoDocument
  ): BulkWriteOperation<CryptoDocument> => ({
    updateOne: {
      filter: { symbol: crypto.symbol },
      update: {
        symbol: crypto.symbol,
        price: crypto.price,
        deprecated: false,
      },
      upsert: true,
    },
  });

  try {
    await bulkWriteInBatches<CryptoDocument>(
      CryptoModel,
      cryptosGetResponse.cryptos,
      cryptoTransformFn
    );

    await CryptoModel.updateMany(
      { symbol: { $nin: Array.from(fetchedSymbols) } },
      { deprecated: true }
    );
  } catch (error) {
    console.log({ error });
  }

  const contentSanityCheckAll: QueueContent = {
    name: QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK_ALL,
  };

  const connection = await connectRabbitmq();
  const channel = await connection.createChannel();

  await channel.assertQueue(MAIN_QUEUE, { durable: true });

  channel.sendToQueue(
    MAIN_QUEUE,
    Buffer.from(JSON.stringify(contentSanityCheckAll))
  );
};
