import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import { Server } from "./common/classes/server";
import { LocalLoginStrategy, LocalRegisterStrategy } from "./strategies/local";
import { GoogleOAuthStrategy } from "./strategies/google";
import { Env } from "./env";

const controllers: any[] = [];
const strategies = [
  new LocalLoginStrategy(),
  new LocalRegisterStrategy(),
  new GoogleOAuthStrategy(),
];
const middlewares = [
  express.json(),
  express.urlencoded({ extended: false }),
  cors({ credentials: true }),
  session({
    secret: Env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 3600000, // 1w
      sameSite: "strict",
    },
  }),
  passport.initialize(),
  passport.session(),
];

Promise.resolve().then(() => {
  const server = new Server(passport, controllers);
  server.set_middlewares(middlewares);
  server.set_strategies(strategies);
  server.start(Env.PORT);
});
