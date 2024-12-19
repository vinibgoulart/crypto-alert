import type { Env } from "hono";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { handleCryptoGet } from "./handleCryptoGet.js";

export const cryptoRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  handleCryptoGet(app);
};
