import type { NextFunction, Request, Response } from "express";

import { Controller } from "../common/decorators/express";

@Controller("/auth")
export default class AuthController {}
