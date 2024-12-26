import cron from "node-cron";
import {
  MAIN_QUEUE,
  QUEUE_CONTENT_NAME_ENUM,
  QueueContent,
} from "@crypto-alert/queues";
import { connectRabbitmq } from "@crypto-alert/rabbitmq";

export const initScheduler = async () => {
  try {
    const connection = await connectRabbitmq();
    const channel = await connection.createChannel();

    await channel.assertQueue(MAIN_QUEUE, { durable: true });

    const content: QueueContent = {
      name: QUEUE_CONTENT_NAME_ENUM.SYNCRONIZE,
    };

    cron.schedule("*/1 * * * *", () => {
      channel.sendToQueue(MAIN_QUEUE, Buffer.from(JSON.stringify(content)));
      console.log(
        `Task sent to MAIN_QUEUE at 1-minute interval. Task: ${content.name}`
      );
    });

    console.log("Scheduler initialized.");
  } catch (error) {
    console.error("Error initializing scheduler: ", error);
  }
};
