import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { priceGet } from "../../blockchain-provider/priceGet.js";

export const criptoPriceGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/cripto/{symbol}",
    request: {
      params: z.object({
        symbol: z.string().openapi({
          param: {
            name: "symbol",
            in: "path",
          },
          example: "btc",
        }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .object({
                symbol: z.string().openapi({
                  example: "btcusdt",
                }),
                price: z.string().openapi({
                  example: "97856.00000000",
                }),
                date: z.string().openapi({
                  example: "2021-10-10T10:10:10Z",
                }),
              })
              .openapi("Cripto"),
          },
        },
        description: "Cripto found",
      },
      404: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string().openapi({
                example: "Cripto not found",
              }),
            }),
          },
        },
        description: "Cripto not found",
      },
    },
  });

  app.openapi(route, async (c) => {
    const { symbol } = c.req.valid("param");

    const price = await priceGet({ symbol });

    if (!price.success) {
      return c.json(
        {
          message: price.error,
        },
        404
      );
    }

    return c.json(price.data, 200);
  });
};
