import type { HttpMethod } from "./http";

export type RouteMetadata = {
  path: string;
  method: HttpMethod;
};
