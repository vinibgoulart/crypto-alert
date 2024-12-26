import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { AlertModel } from "@crypto-alert/alert";
import { UserDocument } from "@crypto-alert/user";
import { CryptoModel } from "@crypto-alert/crypto";
import { ALERT_STATUS_ENUM } from "@crypto-alert/enum";
import { alertMapper } from "./alertMapper.js";

export const handleAlertsGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/alerts",
    request: {
      query: z.object({
        status: z
          .string()
          .openapi({
            example: "true",
          })
          .optional(),
        page: z
          .string()
          .openapi({
            example: "1",
          })
          .optional(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              data: z.array(
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
                    status: z.string().openapi({
                      example: "ACTIVE",
                    }),
                    currentPrice: z.string().openapi({
                      example: "52",
                    }),
                    differencePrice: z.string().openapi({
                      example: "10",
                    }),
                    initialPrice: z.string().openapi({
                      example: "42",
                    }),
                    target: z.string().openapi({
                      example: "HIGHER",
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
              nextPage: z
                .string()
                .openapi({
                  example: "2",
                })
                .nullable(),
            }),
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
    const { page } = c.req.query();
    const status =
      ALERT_STATUS_ENUM[c.req.query("status") as ALERT_STATUS_ENUM] ??
      ALERT_STATUS_ENUM.ACTIVE;

    const alertsGetResponse = await AlertModel.find({
      userId: user._id,
      status,
    })
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * 50)
      .limit(50);

    const alerts = await Promise.all(
      alertsGetResponse.map(async (alert) => alertMapper(alert))
    );

    const hasNextPage = alerts.length === 50;
    const nextPage = hasNextPage ? String(Number(page) + 1) : null;

    return c.json(
      {
        data: alerts,
        nextPage,
      },
      200
    );
  });
};
