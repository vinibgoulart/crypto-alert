import type { Env } from "hono";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { userRegisterPost } from "./userRegisterPost.js";

export const userRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  userRegisterPost(app);
};
