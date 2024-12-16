import amqp from "amqplib";
import { config } from "./config";

const MAIN_QUEUE = "main_queue";

type QueueMessage = {
  message: string;
};

export const initWorker = async () => {
  try {
    const connection = await amqp.connect(config.RABBITMQ_URL!);
    const channel = await connection.createChannel();

    await channel.assertQueue(MAIN_QUEUE, { durable: true });

    console.log("Worker initialized, waiting for messages...");

    const consumeMessages = () => {
      channel.consume(MAIN_QUEUE, (msg) => {
        if (msg !== null) {
          const content: QueueMessage = JSON.parse(msg.content.toString());
          console.log(`Received message: ${content.message}`);

          channel.ack(msg);
        }
      });
    };

    consumeMessages();

    console.log("Worker is now consuming messages.");

    process.on("SIGINT", async () => {
      console.log("Closing RabbitMQ connection...");
      await channel.close();
      await connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error initializing worker: ", error);
  }
};
