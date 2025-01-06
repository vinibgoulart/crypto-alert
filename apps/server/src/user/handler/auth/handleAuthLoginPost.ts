import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { compareSync } from "bcrypt";
import { sessionCookieGenerate } from "../../../session/sessionCookieGenerate.js";
import { SESSION_USER_COOKIE } from "../../../session/sessionUserCookie.js";
import { sessionCookieSet } from "../../../session/sessionCookieSet.js";
import { UserModel } from "@crypto-alert/user";

export const handleAuthLoginPost = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "post",
    path: "/auth/login",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              email: z
                .string({ message: "Email is required" })
                .email({ message: "Email is invalid" })
                .transform((v) => v.toLowerCase())
                .openapi({
                  example: "user@mail.com",
                  description: "Email of the user",
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
        description: "Login a user",
        required: true,
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string().openapi({
                example: "User logged in",
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
                example: "Identifier or password is incorrect",
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
    console.log("osi");
    const { email, password } = c.req.valid("json");
    console.log("osi");

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return c.json(
        {
          error: "Identifier or password is incorrect",
        },
        400
      );
    }

    if (!compareSync(password, user.password)) {
      return c.json(
        {
          error: "Identifier or password is incorrect",
        },
        400
      );
    }

    const userToken = sessionCookieGenerate(
      user._id?.toString(),
      SESSION_USER_COOKIE
    );

    sessionCookieSet({
      c,
      cookie: SESSION_USER_COOKIE,
      value: userToken,
    });

    console.log("oi");

    return c.json(
      {
        message: "User logged in",
      },
      200
    );
  });
};
