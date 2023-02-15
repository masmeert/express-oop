import "reflect-metadata";

import type { Constructor } from "../types/fn";

export function Controller<ConstructorFn extends Constructor>(
  base_path: string
) {
  return (target: ConstructorFn) => {
    Reflect.defineMetadata("base_path", base_path, target);
  };
}
