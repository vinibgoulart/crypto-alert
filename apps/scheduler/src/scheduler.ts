import amqp from "amqplib";
import cron from "node-cron";
import { config } from "./config";

const MAIN_QUEUE = "main_queue";

export const initScheduler = async () => {
  try {
    const connection = await amqp.connect(config.RABBITMQ_URL!);
    const channel = await connection.createChannel();

    await channel.assertQueue(MAIN_QUEUE, { durable: true });

    cron.schedule("*/30 * * * *", () => {
      channel.sendToQueue(MAIN_QUEUE, Buffer.from("Scheduled Task"));
      console.log("Task sent to MAIN_QUEUE at 30-minute interval.");
    });

    console.log("Scheduler initialized.");
  } catch (error) {
    console.error("Error initializing scheduler: ", error);
  }
};
