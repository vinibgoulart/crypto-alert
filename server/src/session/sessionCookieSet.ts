import type { Context } from "hono";
import { setCookie } from "hono/cookie";

type SessionCookieSetArgs = {
  c: Context;
  cookie: string;
  value: string;
};

const date = 2592000; // 30 days

export const sessionCookieSet = ({
  c,
  cookie,
  value,
}: SessionCookieSetArgs) => {
  setCookie(c, cookie, value, {
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: date,
    sameSite: "Lax",
  });
};
