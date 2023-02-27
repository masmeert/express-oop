import "reflect-metadata";

import type { RouteMetadata } from "../types/core";
import type { HttpMethod, HttpRoute } from "../types/http";

/*
 * Decorator for handling routes
 * @param metadata - Route metadata
 * @returns Method decorator, which adds the route metadata to the parent controller's router
 */
function handler(metadata: RouteMetadata): MethodDecorator {
  return function (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    const controller = target.constructor;
    const routes: HttpRoute[] = Reflect.getMetadata("routes", controller) ?? [];
    routes.push({
      path: metadata.path || "/",
      method: metadata.method || "get",
      handler: key,
    });
    Reflect.defineMetadata("routes", routes, controller);
    return descriptor;
  };
}

export function create_handler(
  method: HttpMethod
): (path?: string) => MethodDecorator {
  return function (path?: string): MethodDecorator {
    return handler({ path, method });
  };
}

export const Get = create_handler("get");
export const Post = create_handler("post");
export const Put = create_handler("put");
export const Delete = create_handler("delete");
export const Patch = create_handler("patch");
