import type { Env } from "hono";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { handleCryptosGet } from "./handleCryptosGet.js";

export const cryptoRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  handleCryptosGet(app);
};
