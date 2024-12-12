import { OpenAPIHono } from "@hono/zod-openapi";
import { authMiddleware } from "./user/handler/auth/authMiddleware.js";
import { authRoutes } from "./user/handler/auth/authRoutes.js";
import { alertRoutes } from "./alert/handler/alertRoutes.js";
import { criptoRoutes } from "./cripto/handler/criptoRoutes.js";
import { userRoutes } from "./user/handler/userRoutes.js";
import { swaggerUI } from "@hono/swagger-ui";

export const routes = () => {
  const api = new OpenAPIHono();
  const app = new OpenAPIHono();
  const auth = new OpenAPIHono();

  authMiddleware(app);
  authRoutes(auth);
  alertRoutes(app);
  criptoRoutes(app);
  userRoutes(app);

  api.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "cripto alert",
    },
  });

  api.get("/swagger", swaggerUI({ url: "/doc" }));

  api.route("/", auth);
  api.route("/", app);

  return api;
};
