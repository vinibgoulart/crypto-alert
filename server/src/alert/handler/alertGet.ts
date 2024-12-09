import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";

export const alertGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/alert",
    request: {
      params: z.object({
        id: z
          .string()
          .min(3)
          .openapi({
            param: {
              name: "id",
              in: "path",
            },
            example: "123",
          }),
      }),
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
        description: "Alert found",
      },
    },
  });

  app.openapi(route, (c) => {
    const { id } = c.req.valid("param");
    return c.json({
      id,
      name: "Buy alert",
      price: 42,
      symbol: "BTC",
    });
  });
};
