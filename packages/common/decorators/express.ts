import "reflect-metadata";
import { ZodError, type ZodType } from "zod";
import type { NextFunction, Request, Response } from "express";

/*
 * Decorator for Express request body
 * @param schema Zod schema
 * @returns Decorator function
 * @example
 * function(Body(zod_schema) body: z.infer<typeof zod_schema>) {}
 * This acts as a middleware to validate the request body
 */
