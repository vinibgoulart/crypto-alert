import { alertCreate } from "@crypto-alert/alert";
import { CryptoModel } from "@crypto-alert/crypto";
import { ALERT_STATUS_ENUM } from "@crypto-alert/enum";
import { UserDocument } from "@crypto-alert/user";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";

export const handleAlertPost = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "post",
    path: "/alert",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              price: z
                .string({ message: "Price is required" })
                .min(1)
                .openapi({
                  example: "42",
                  description: "Price of the coin",
                })
                .openapi({
                  example: "42",
                  description: "Price to buy the coin",
                }),
              symbol: z
                .string({ message: "Symbol is required" })
                .min(1)
                .openapi({
                  example: "BTC",
                  description: "Symbol of the coin",
                })
                .openapi({
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
            schema: z.object({
              _id: z.string().openapi({
                example: "123",
              }),
              price: z.number().openapi({
                example: 42,
              }),
              symbol: z.string().openapi({
                example: "BTC",
              }),
              status: z.string().openapi({
                example: "ACTIVE",
              }),
              currentPrice: z.string().openapi({
                example: "52",
              }),
              differencePrice: z.string().openapi({
                example: "10",
              }),
              reachedAt: z.string().openapi({
                example: "2021-08-20T19:10:00.000Z",
              }),
              createdAt: z.string().openapi({
                example: "2021-08-20T19:10:00.000Z",
              }),
            }),
          },
        },
        description: "Alert created",
      },
      400: {
        content: {
          "application/json": {
            schema: z.object({
              error: z.string().openapi({
                example: "Alert already exists",
                description: "Error message",
              }),
            }),
          },
        },
        description: "Error creating alert",
      },
    },
  });

  app.openapi(route, async (c) => {
    const user = c.get("User") as UserDocument;
    const { price, symbol } = c.req.valid("json");

    const alertCreateResponse = await alertCreate({
      price: Number(price),
      symbol,
      status: ALERT_STATUS_ENUM.ACTIVE,
      user,
    });

    if (!alertCreateResponse.success) {
      return c.json(
        {
          error: alertCreateResponse.error,
        },
        400
      );
    }

    const { alert } = alertCreateResponse;

    const currentPrice = await CryptoModel.findOne({
      symbol: alert.symbol,
    });

    const differencePrice = (
      alert.price - (Number(currentPrice?.price) ?? 0)
    ).toFixed(2);

    return c.json(
      {
        _id: alert._id,
        price: alert.price,
        symbol: alert.symbol,
        status: alert.status,
        currentPrice: currentPrice?.price ?? "0",
        differencePrice: String(differencePrice),
        reachedAt: alert.reachedAt,
        createdAt: alert.createdAt,
      },
      200
    );
  });
};
