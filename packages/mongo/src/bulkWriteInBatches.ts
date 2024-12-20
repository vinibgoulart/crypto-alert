import { AnyBulkWriteOperation } from "mongoose";

export type BulkWriteOperation<Model> = AnyBulkWriteOperation<Model>;

const chunkArray = <Model>(array: Model[], size: number): Model[][] => {
  const chunks: Model[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const bulkWriteInBatches = async <Model>(
  model: {
    bulkWrite: (operations: BulkWriteOperation<Model>[]) => Promise<unknown>;
  },
  data: any[],
  fn: (item: Model) => BulkWriteOperation<Model>,
  batchSize = 20
): Promise<void> => {
  const dataChunks = chunkArray(data, batchSize);

  for (const chunk of dataChunks) {
    const operations = chunk.map(fn);
    await model.bulkWrite(operations);
  }
};
