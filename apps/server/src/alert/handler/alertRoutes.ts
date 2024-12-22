import type { Env } from "hono";
import { handleAlertPost } from "./handleAlertPost.js";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { handleAlertsGet } from "./handleAlertsGet.js";

export const alertRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  handleAlertPost(app);
  handleAlertsGet(app);
};
