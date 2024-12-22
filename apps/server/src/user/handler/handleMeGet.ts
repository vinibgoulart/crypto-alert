import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { UserDocument } from "@crypto-alert/user";

export const handleMeGet = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "get",
    path: "/user/me",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .object({
                _id: z.string().openapi({
                  example: "123",
                  description: "Id of the user",
                }),
                name: z.string().openapi({
                  example: "John Due",
                  description: "Name of the user",
                }),
                email: z.string().email().openapi({
                  example: "user@mail.com",
                  description: "Email of the user",
                }),
                phone: z.string().openapi({
                  example: "+1234567890",
                  description: "Phone number of the user",
                }),
                notification: z.object({
                  email: z.boolean().openapi({
                    example: true,
                    description: "Email notification enabled",
                  }),
                  sms: z.boolean().openapi({
                    example: true,
                    description: "Phone notification enabled",
                  }),
                  pushNotification: z.boolean().openapi({
                    example: true,
                    description: "Push notification enabled",
                  }),
                }),
                createdAt: z.string().openapi({
                  example: "2021-07-01T00:00:00.000Z",
                  description: "Date of creation",
                }),
              })
              .openapi("User"),
          },
        },
        description: "User found",
      },
      404: {
        content: {
          "application/json": {
            schema: z.object({
              error: z.string().openapi({
                example: "User not found",
              }),
            }),
          },
        },
        description: "User not found",
      },
    },
  });

  app.openapi(route, async (c) => {
    const user = c.get("User") as UserDocument;

    if (!user) {
      return c.json(
        {
          error: "User not found",
        },
        404
      );
    }

    return c.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        notification: user.notification,
        createdAt: user.createdAt.toISOString(),
      },
      200
    );
  });
};
