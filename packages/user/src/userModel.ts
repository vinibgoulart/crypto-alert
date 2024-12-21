import { model, Schema, type Types } from "mongoose";
import { writeConcern } from "@crypto-alert/mongo";
import {
  UserNotificationDocument,
  UserNotificationSchema,
} from "./notification/userNotificationSchema";

type User = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  notification: UserNotificationDocument;
  createdAt: Date;
  updatedAt: Date;
  removedAt: Date;
};

export type UserDocument = User & Document;

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    phone: { type: String, required: true },
    notification: { type: UserNotificationSchema, required: true },
    password: { type: String, required: true },
    removedAt: { type: Date, default: null },
  },
  {
    collection: "User",
    writeConcern,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const UserModel = model<UserDocument>("User", UserSchema);
