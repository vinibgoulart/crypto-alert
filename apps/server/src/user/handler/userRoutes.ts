import type { OpenAPIHono } from "@hono/zod-openapi";
import { handleMeGet } from "./handleMeGet.js";
import type { Env } from "hono";

export const userRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  handleMeGet(app);
};
