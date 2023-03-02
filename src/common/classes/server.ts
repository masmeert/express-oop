import express, { type RequestHandler } from "express";
import { PassportStatic } from "passport";

import type { HttpRoute } from "../types/http";
import { prisma } from "../utils/prisma";
import Strategy from "./strategy";

export class Server {
  private readonly app: express.Application;
  private passport: PassportStatic;

  constructor(passport: PassportStatic) {
    this.app = express();
    this.passport = passport;
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  public set_middlewares(middlewares: RequestHandler[]): void {
    for (const middleware of middlewares) {
      this.app.use(middleware);
    }
  }

  public set_strategies(strategies: Strategy[]) {
    strategies.forEach((strategy) => {
      this.passport.use(strategy.name, strategy.strategy);
    });
    this.passport.serializeUser((user: any, done: any) => {
      return done(null, user.id);
    });

    this.passport.deserializeUser(async (id: any, done: any) => {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) return done(null, false, { message: "User not found" });
      return done(null, user);
    });
  }

  public set_controllers(controllers: { new (): any }[]): void {
    for (const controller of controllers) {
      const instance = new controller() as any;
      const path = Reflect.getMetadata("path", controller);
      const routes = Reflect.getMetadata("routes", controller) as HttpRoute[];
      const router = express.Router();
      console.table(routes);
      for (const route of routes) {
        const handler = instance[route.handler];
        router[route.method](route.path, handler);
      }
      this.app.use(path, router);
    }
  }
}
