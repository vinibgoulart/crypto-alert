import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { alertRoutes } from "./alert/handler/alertRoutes.js";
import { criptoRoutes } from "./cripto/handler/criptoRoutes.js";
import { connectMongo } from "./mongo/connectMongo.js";
import { userRoutes } from "./user/handler/userRoutes.js";

export const server = async () => {
  try {
    console.log("connecting to database...");
    await connectMongo();
  } catch (err) {
    console.log("Could not connect to database", { err });
    throw err;
  }

  const app = new OpenAPIHono();

  const port = 4003;
  console.log(`Server is running on http://localhost:${port}`);

  alertRoutes(app);
  criptoRoutes(app);
  userRoutes(app);

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "cripto alert",
    },
  });

  app.get("/swagger", swaggerUI({ url: "/doc" }));

  serve({
    fetch: app.fetch,
    port,
  });
};
