import passport from "passport";
import type { NextFunction, Request, Response } from "express";

import { Controller } from "../common/decorators/express";
import { Get, Post } from "../common/decorators/handlers";

@Controller("/auth")
export default class AuthController {
  async send_success<T>(
    res: Response,
    data: T,
    message?: string
  ) {
    return res.status(200).json({
      message: message || "success",
      data: data,
    });
  }

  async send_error(res: Response, message?: string) {
    return res.status(500).json({
      message: message || "internal server error",
    });
  }

  async auth_callback(res: Response) {
    return res.redirect("http://localhost:3000");
  }

  @Get("/user")
  async verify(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.send_success(res, req.user ?? "");
  }

  @Post("/login")
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    passport.authenticate("login", (_err, user, info) => {
      return info ? this.send_error(res, info.message) : this.send_success(res, user);
    })(req, res, next);
  }

  @Get("/logout")
  async logout(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (!req.user) return;

    req.logOut(() => {
      this.send_success(res, {});
    });
  }

  @Post("/register")
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    passport.authenticate("register", (err, user, info) => {
      if (info)
        return this.send_error(res, info.message);

      return req.logIn(user, async () => {
        return this.send_success(res, user);
      })
    })(req, res, next)
  }

  @Get("/google")
  async google(
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    return this.auth_callback(res);
  }

}
