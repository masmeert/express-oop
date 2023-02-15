import "reflect-metadata";

import type { HttpMethod } from "../types/http";

function handlerFactory(method: HttpMethod) {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controller_class = target.constructor;
      const routers = Reflect.hasMetadata("routers", controller_class)
        ? Reflect.getMetadata("routers", controller_class)
        : [];
      routers.push({
        path,
        method,
        handler_name: propertyKey,
      });
      Reflect.defineMetadata("routers", routers, controller_class);
    };
  };
}

export const Get = handlerFactory("get");
export const Post = handlerFactory("post");
export const Put = handlerFactory("put");
export const Delete = handlerFactory("delete");
export const Patch = handlerFactory("patch");
