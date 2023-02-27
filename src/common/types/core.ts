import type { HttpMethod } from "./http";

export type RouteMetadata = {
  path?: string;
  method: HttpMethod;
};

export type ServiceResponse<T> = Promise<{
  message: string;
  success: boolean;
  data?: T | T[];
}>;
