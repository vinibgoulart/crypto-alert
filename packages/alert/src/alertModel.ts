import { model, Schema, Types } from "mongoose";
import { writeConcern } from "@crypto-alert/mongo";
import { ALERT_STATUS_ENUM, ALERT_TARGET_ENUM } from "@crypto-alert/enum";

type Alert = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  price: number;
  initialPrice: string;
  reachedPrice: string;
  target: ALERT_TARGET_ENUM;
  symbol: string;
  status: ALERT_STATUS_ENUM;
  reachedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  removedAt: Date;
};

export type AlertDocument = Alert & Document;

const AlertSchema = new Schema<AlertDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    price: { type: Number, required: true },
    initialPrice: { type: String, required: true },
    reachedPrice: { type: String },
    target: {
      type: String,
      required: true,
      enum: ALERT_TARGET_ENUM,
    },
    symbol: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: ALERT_STATUS_ENUM.ACTIVE,
      enum: ALERT_STATUS_ENUM,
    },
    reachedAt: { type: Date, default: null },
    removedAt: { type: Date, default: null },
  },
  {
    collection: "Alert",
    writeConcern,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const AlertModel = model<AlertDocument>("Alert", AlertSchema);
