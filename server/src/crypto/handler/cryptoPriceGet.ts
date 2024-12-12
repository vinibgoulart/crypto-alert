import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { priceGet } from "../../blockchain-provider/priceGet.js";

export const cryptoPriceGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/crypto/{symbol}",
    request: {
      params: z.object({
        symbol: z.string({ message: "Symbol is required" }).openapi({
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
              .openapi("Crypto"),
          },
        },
        description: "Crypto found",
      },
      404: {
        content: {
          "application/json": {
            schema: z.object({
              error: z.string().openapi({
                example: "Crypto not found",
              }),
            }),
          },
        },
        description: "Crypto not found",
      },
    },
  });

  app.openapi(route, async (c) => {
    const { symbol } = c.req.valid("param");

    const priceGetResponse = await priceGet({ symbol });

    if (!priceGetResponse.success) {
      return c.json(
        {
          error: priceGetResponse.error,
        },
        404
      );
    }

    return c.json(priceGetResponse.price, 200);
  });
};
