import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { AlertModel } from "@crypto-alert/alert";
import { getObjectId } from "@crypto-alert/mongo";
import { alertMapper } from "./alertMapper.js";

export const handleAlertGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/alert",
    request: {
      query: z.object({
        _id: z
          .string()
          .openapi({
            example: "123",
          })
          .optional(),
      }),
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
              initialPrice: z.string().openapi({
                example: "42",
              }),
              reachedPrice: z.string().openapi({
                example: "52",
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
    const { _id } = c.req.query();

    const alertGetResponse = await AlertModel.findOne({
      _id: getObjectId(_id),
    });

    if (!alertGetResponse) {
      return c.json(
        {
          message: "Alert not found",
        },
        404
      );
    }

    const alert = await alertMapper(alertGetResponse);

    return c.json(alert, 200);
  });
};
