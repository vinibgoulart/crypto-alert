import amqp from "amqplib";
import cron from "node-cron";
import { config } from "./config";
import { MAIN_QUEUE, QueueContent } from "@crypto-alert/jobs";

export const initScheduler = async () => {
  try {
    const connection = await amqp.connect(config.RABBITMQ_URL!);
    const channel = await connection.createChannel();

    await channel.assertQueue(MAIN_QUEUE, { durable: true });

    const content: QueueContent = {
      message: "Scheduled Task",
    };

    cron.schedule("*/30 * * * *", () => {
      channel.sendToQueue(MAIN_QUEUE, Buffer.from(JSON.stringify(content)));
      console.log("Task sent to MAIN_QUEUE at 30-minute interval.");
    });

    console.log("Scheduler initialized.");
  } catch (error) {
    console.error("Error initializing scheduler: ", error);
  }
};
