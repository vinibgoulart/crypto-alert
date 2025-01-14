import { model, Schema, type Types } from "mongoose";
import { writeConcern } from "@crypto-alert/mongo";

type Crypto = {
  _id: Types.ObjectId;
  symbol: string;
  price: string;
  deprecated: boolean;
  createdAt: Date;
  updatedAt: Date;
  removedAt: Date;
};

export type CryptoDocument = Crypto & Document;

const CryptoSchema = new Schema<CryptoDocument>(
  {
    symbol: { type: String, required: true, index: true, unique: true },
    price: { type: String, required: true },
    deprecated: { type: Boolean, default: false },
    removedAt: { type: Date, default: null },
  },
  {
    collection: "Crypto",
    writeConcern,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const CryptoModel = model<CryptoDocument>("Crypto", CryptoSchema);
