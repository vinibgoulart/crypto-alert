import type { Env } from "hono";
import { alertPost } from "./alertPost.js";
import { alertGet } from "./alertGet.js";
import type { OpenAPIHono } from "@hono/zod-openapi";

export const alertRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  alertPost(app);
  alertGet(app);
};
