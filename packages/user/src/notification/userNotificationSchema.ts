import { Schema } from "mongoose";
import { writeConcern } from "@crypto-alert/mongo";

type UserNotification = {
  email: boolean;
  sms: boolean;
  pushNotification: boolean;
};

export type UserNotificationDocument = UserNotification & Document;

export const UserNotificationSchema = new Schema<UserNotificationDocument>(
  {
    email: { type: Boolean, required: true, default: false },
    sms: { type: Boolean, required: true, default: false },
    pushNotification: { type: Boolean, required: true, default: true },
  },
  {
    collection: "Notification",
    _id: false,
    writeConcern,
  }
);
