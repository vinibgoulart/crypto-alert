import {
  MAIN_QUEUE,
  QUEUE_CONTENT_NAME_ENUM,
  QueueContent,
} from "@crypto-alert/queues";
import { AlertModel } from "../alertModel";
import { connectRabbitmq } from "@crypto-alert/rabbitmq";
import { ALERT_STATUS_ENUM } from "@crypto-alert/enum";

export const jobSanityCheckAll = async (content: QueueContent) => {
  if (content.name !== QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK_ALL) {
    throw new Error("Invalid job type");
  }

  const allSymbolsWithAlert = await AlertModel.find({
    status: ALERT_STATUS_ENUM.ACTIVE,
  }).distinct("symbol");

  for (const symbol of allSymbolsWithAlert) {
    const content: QueueContent = {
      name: QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK,
      data: {
        symbol,
      },
    };

    const connection = await connectRabbitmq();
    const channel = await connection.createChannel();

    await channel.assertQueue(MAIN_QUEUE, { durable: true });

    channel.sendToQueue(MAIN_QUEUE, Buffer.from(JSON.stringify(content)));
  }
};
