import type { Env } from "hono";
import { alertPost } from "./alertPost.js";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { alertsGet } from "./alertsGet.js";

export const alertRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  alertPost(app);
  alertsGet(app);
};
