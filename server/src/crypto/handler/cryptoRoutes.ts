import type { Env } from "hono";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { cryptoPriceGet } from "./cryptoPriceGet.js";

export const cryptoRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  cryptoPriceGet(app);
};
