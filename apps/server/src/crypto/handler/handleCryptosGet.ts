import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { CryptoModel } from "@crypto-alert/crypto";

export const handleCryptosGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/cryptos",
    request: {
      query: z.object({
        symbol: z
          .string()
          .openapi({
            example: "BTCUSDT",
          })
          .optional(),
        page: z
          .string()
          .openapi({
            example: "1",
          })
          .optional(),
        search: z
          .string()
          .openapi({
            example: "BTC",
          })
          .optional(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .object({
                data: z.array(
                  z
                    .object({
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
                    .openapi("Crypto")
                ),
                nextPage: z
                  .string()
                  .openapi({
                    example: "2",
                  })
                  .nullable(),
              })
              .openapi({
                example: {
                  data: [
                    {
                      symbol: "btcusdt",
                      price: "97856.00000000",
                      updatedAt: "2021-08-20T19:10:00.000Z",
                    },
                  ],
                  nextPage: "2",
                },
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
    const { page, search } = c.req.query();

    const getFilters = () => {
      if (!search) {
        return {};
      }

      return {
        symbol: new RegExp(`^${search}`, "i"),
      };
    };

    const cryptosGetResponse = await CryptoModel.find({
      ...getFilters(),
    })
      .sort({ symbol: 1 })
      .skip((Number(page) - 1) * 50)
      .limit(50);

    const cryptos = cryptosGetResponse.map((crypto) => {
      return {
        symbol: crypto.symbol,
        price: crypto.price,
        updatedAt: crypto.updatedAt,
      };
    });

    const hasNextPage = cryptos.length === 50;
    const nextPage = hasNextPage ? String(Number(page) + 1) : null;

    return c.json(
      {
        data: cryptos,
        nextPage,
      },
      200
    );
  });
};
