/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * crypto alert
 * OpenAPI spec version: 1.0.0
 */
import type { Crypto } from './crypto';

export type GetCryptos200 = {
  data: Crypto[];
  /** @nullable */
  nextPage: string | null;
};