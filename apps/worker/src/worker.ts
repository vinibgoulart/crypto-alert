import { MAIN_QUEUE, QueueContent } from "@crypto-alert/queues";
import { connectMongo } from "@crypto-alert/mongo";
import { connectRabbitmq } from "@crypto-alert/rabbitmq";
import { JOBS } from "@crypto-alert/jobs";

export const initWorker = async () => {
  try {
    console.log("Connecting to database...");
    await connectMongo();
    const connection = await connectRabbitmq();
    const channel = await connection.createChannel();

    await channel.assertQueue(MAIN_QUEUE, { durable: true });

    console.log("Worker initialized, waiting for messages...");

    const consumeMessages = () => {
      channel.consume(MAIN_QUEUE, async (msg) => {
        if (msg !== null) {
          const content: QueueContent = JSON.parse(msg.content.toString());
          console.log(`Received message: ${content.name}`);
          await JOBS[content.name](content);
          console.log(`Task completed: ${content.name}`);

          channel.ack(msg);
        }
      });
    };

    consumeMessages();

    console.log("Worker is now consuming messages.");

    process.on("SIGINT", async () => {
      console.log("Closing RabbitMQ connection...");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error initializing worker: ", error);
  }
};
