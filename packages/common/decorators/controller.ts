import "reflect-metadata";

import type { ConstructorFn } from "../types/fn";

export function Controller(path: string) {
  return function (target: ConstructorFn) {
    Reflect.defineMetadata("path", path, target);
  };
}
