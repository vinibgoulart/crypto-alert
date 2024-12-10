import type { Env } from "hono";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { criptoPriceGet } from "./criptoPriceGet.js";

export const criptoRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  criptoPriceGet(app);
};
