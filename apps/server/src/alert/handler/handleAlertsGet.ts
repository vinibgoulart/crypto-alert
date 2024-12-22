import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { AlertModel } from "@crypto-alert/alert";
import { UserDocument } from "@crypto-alert/user";
import { CryptoModel } from "@crypto-alert/crypto";

export const handleAlertsGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/alerts",
    request: {
      query: z.object({
        active: z
          .string()
          .openapi({
            example: "true",
          })
          .optional(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(
              z
                .object({
                  _id: z.string().openapi({
                    example: "123",
                  }),
                  price: z.number().openapi({
                    example: 42,
                  }),
                  symbol: z.string().openapi({
                    example: "BTC",
                  }),
                  active: z.boolean().openapi({
                    example: true,
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
                })
                .openapi("Alert")
            ),
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
    const user = c.get("User") as UserDocument;
    const active = c.req.query("active")
      ? c.req.query("active") === "true"
      : true;

    const alertsGetResponse = await AlertModel.find({
      userId: user._id,
      active,
    });

    const alerts = await Promise.all(
      alertsGetResponse.map(async (alert) => {
        const currentPrice = await CryptoModel.findOne({
          symbol: alert.symbol,
        });

        const differencePrice = (
          alert.price - (Number(currentPrice?.price) ?? 0)
        ).toFixed(2);

        return {
          _id: alert._id,
          price: alert.price,
          symbol: alert.symbol,
          active: alert.active,
          currentPrice: currentPrice?.price ?? "0",
          differencePrice: String(differencePrice),
          reachedAt: alert.reachedAt,
          createdAt: alert.createdAt,
        };
      })
    );

    return c.json(alerts, 200);
  });
};
