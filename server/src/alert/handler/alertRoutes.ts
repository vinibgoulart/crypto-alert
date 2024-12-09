import type { Env } from "hono";
import { alertCreate } from "./alertCreate.js";
import { alertGet } from "./alertGet.js";
import type { OpenAPIHono } from "@hono/zod-openapi";

export const alertRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  alertCreate(app);
  alertGet(app);
};
