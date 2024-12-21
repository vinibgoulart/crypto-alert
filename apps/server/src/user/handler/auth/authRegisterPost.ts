import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { hashSync } from "bcrypt";
import { sessionCookieGenerate } from "../../../session/sessionCookieGenerate.js";
import { SESSION_USER_COOKIE } from "../../../session/sessionUserCookie.js";
import { sessionCookieSet } from "../../../session/sessionCookieSet.js";
import { phone } from "phone";
import { userCreate } from "@crypto-alert/user";

export const authRegisterPost = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "post",
    path: "/auth/register",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              name: z.string({ message: "Name is required" }).openapi({
                example: "John Due",
                description: "Name of the user",
              }),
              email: z
                .string({ message: "Email is required" })
                .email({ message: "Email is invalid" })
                .transform((v) => v.toLowerCase())
                .openapi({
                  example: "user@mail.com",
                  description: "Email of the user",
                }),
              phone: z
                .string({ message: "Phone is required" })
                .openapi({
                  example: "+1234567890",
                  description: "Phone of the user",
                })
                .refine((v) => phone(v).isValid, {
                  message: "Phone is invalid",
                }),
              password: z
                .string({ message: "Password is required" })
                .min(6, "Password must be at least 6 characters")
                .openapi({
                  example: "password",
                  description: "Password of the user",
                }),
            }),
          },
        },
        description: "Register as a user",
        required: true,
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string().openapi({
                example: "User created",
                description: "Success message",
              }),
            }),
          },
        },
        description: "User created",
      },
      400: {
        content: {
          "application/json": {
            schema: z.object({
              error: z.string().openapi({
                example: "User already exists",
                description: "Error message",
              }),
            }),
          },
        },
        description: "Error creating user",
      },
    },
  });

  app.openapi(route, async (c) => {
    const { name, email, password, phone } = c.req.valid("json");

    const userCreateResponse = await userCreate({
      name,
      email,
      phone,
      password: hashSync(password, 10),
    });

    if (!userCreateResponse.success) {
      return c.json(
        {
          error: userCreateResponse.error,
        },
        400
      );
    }

    const { user } = userCreateResponse;

    const userToken = sessionCookieGenerate(
      user._id?.toString(),
      SESSION_USER_COOKIE
    );

    sessionCookieSet({
      c,
      cookie: SESSION_USER_COOKIE,
      value: userToken,
    });

    return c.json(
      {
        message: "User created",
      },
      200
    );
  });
};
