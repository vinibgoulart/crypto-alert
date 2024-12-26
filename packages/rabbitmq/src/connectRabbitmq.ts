import amqp from "amqplib";
import { config } from "./config";

export const connectRabbitmq = async () => {
  return amqp.connect(config.RABBITMQ_URL!);
};
