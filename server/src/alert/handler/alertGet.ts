import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";

export const alertGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/alert/{id}",
    request: {
      params: z.object({
        id: z.string().openapi({
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
      404: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string().openapi({
                example: "Alert not found",
              }),
            }),
          },
        },
        description: "Alert not found",
      },
    },
  });

  app.openapi(route, async (c) => {
    const { id } = c.req.valid("param");

    if (id !== "123") {
      return c.json(
        {
          message: "Alert not found",
        },
        404
      );
    }

    return c.json(
      {
        id,
        name: "Buy alert",
        price: 42,
        symbol: "BTC",
      },
      200
    );
  });
};
