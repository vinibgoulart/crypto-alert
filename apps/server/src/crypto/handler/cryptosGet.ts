import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { cryptoGet } from "../../blockchain-provider/cryptoGet.js";

export const cryptoPriceGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/crypto",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(
              z.object({
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
            ),
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

    const cryptoGetResponse = await cryptoGet({ symbol });

    if (!cryptoGetResponse.success) {
      return c.json(
        {
          error: cryptoGetResponse.error,
        },
        404
      );
    }

    return c.json(cryptoGetResponse.crypto, 200);
  });
};
