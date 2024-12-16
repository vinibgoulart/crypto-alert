import { model, Schema, type Types } from "mongoose";
import { writeConcern } from "../mongo/writeConcern.js";

type Crypto = {
  _id: Types.ObjectId;
  symbol: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  removedAt: Date;
};

export type CryptoDocument = Crypto & Document;

const CryptoSchema = new Schema<CryptoDocument>(
  {
    symbol: { type: String, required: true, index: true, unique: true },
    price: { type: String, required: true },
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
