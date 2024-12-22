import type { Env } from "hono";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { handleAuthRegisterPost } from "./handleAuthRegisterPost.js";
import { handleAuthLoginPost } from "./handleAuthLoginPost.js";
import { handleAuthLogoutPost } from "./handleAuthLogoutPost.js";

export const authRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  handleAuthRegisterPost(app);
  handleAuthLoginPost(app);
  handleAuthLogoutPost(app);
};
