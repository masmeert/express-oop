import "reflect-metadata";

import type { Constructor } from "../types/fn";

export function Controller(path: string) {
  return function (target: Constructor<any>) {
    Reflect.defineMetadata("path", path, target);
  };
}
