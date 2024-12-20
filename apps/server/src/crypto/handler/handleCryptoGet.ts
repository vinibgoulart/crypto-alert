import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { CryptoModel } from "@crypto-alert/crypto";

export const handleCryptoGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/crypto",
    request: {
      query: z.object({
        symbol: z
          .string()
          .openapi({
            example: "BTCUSDT",
          })
          .optional(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .union([
                z.object({
                  symbol: z.string().openapi({
                    example: "btcusdt",
                  }),
                  price: z.string().openapi({
                    example: "97856.00000000",
                  }),
                  updatedAt: z.string().openapi({
                    example: "2021-08-20T19:10:00.000Z",
                  }),
                }),
                z.array(
                  z.object({
                    symbol: z.string().openapi({
                      example: "btcusdt",
                    }),
                    price: z.string().openapi({
                      example: "97856.00000000",
                    }),
                    updatedAt: z.string().openapi({
                      example: "2021-08-20T19:10:00.000Z",
                    }),
                  })
                ),
              ])
              .openapi({
                examples: [
                  {
                    symbol: "btcusdt",
                    price: "97856.00000000",
                    updatedAt: "2021-08-20T19:10:00.000Z",
                  },
                  [
                    {
                      symbol: "btcusdt",
                      price: "97856.00000000",
                      updatedAt: "2021-08-20T19:10:00.000Z",
                    },
                    {
                      symbol: "ethusdt",
                      price: "4567.00000000",
                      updatedAt: "2021-08-20T19:10:00.000Z",
                    },
                  ],
                ],
              }),
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
    const symbol = c.req.query("symbol");

    if (symbol) {
      const cryptoGetResponse = await CryptoModel.findOne({
        symbol: symbol.toUpperCase(),
      });

      if (!cryptoGetResponse) {
        return c.json(
          {
            error: "Crypto not found",
          },
          404
        );
      }

      const crypto = {
        symbol: cryptoGetResponse.symbol,
        price: cryptoGetResponse.price,
        updatedAt: cryptoGetResponse.updatedAt,
      };

      return c.json(crypto, 200);
    }

    const cryptosGetResponse = await CryptoModel.find();

    const cryptos = cryptosGetResponse.map((crypto) => {
      return {
        symbol: crypto.symbol,
        price: crypto.price,
        updatedAt: crypto.updatedAt,
      };
    });

    return c.json(cryptos, 200);
  });
};
