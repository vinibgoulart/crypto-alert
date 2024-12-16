import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";

export const alertPost = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "post",
    path: "/alert",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              name: z.string({ message: "Name is required" }).openapi({
                example: "Create an alert",
                description: "Name of the alert",
              }),
              price: z.number({ message: "Price is required" }).openapi({
                example: 42,
                description: "Price to buy in USD",
              }),
              symbol: z.string({ message: "Symbol is required" }).openapi({
                example: "BTC",
                description: "Symbol of the coin",
              }),
            }),
          },
        },
        description: "Create a new alert",
        required: true,
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .object({
                id: z.string().openapi({
                  example: "123",
                }),
                name: z.string().openapi({
                  example: "Buy alert",
                }),
                price: z.number().openapi({
                  example: 42,
                }),
                symbol: z.string().openapi({
                  example: "BTC",
                }),
              })
              .openapi("Alert"),
          },
        },
        description: "Alert created",
      },
    },
  });

  app.openapi(route, (c) => {
    const { name, price, symbol } = c.req.valid("json");
    return c.json({
      id: "123",
      name,
      price,
      symbol,
    });
  });
};
