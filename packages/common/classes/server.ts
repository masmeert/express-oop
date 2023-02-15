import express from "express";
import type { Router } from "../types/http";

export class Server {
  private readonly app: express.Application;

  constructor(controllers: any[]) {
    this.app = express();
    this.app.use(express.json());
    this.bind_routes(controllers);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  public bind_routes<C>(controllers: { new (): C }[]) {
    const info: Array<{ api: string; handler: string }> = [];
    for (const controller of controllers) {
      const instance = new controller() as any;
      const base_path = Reflect.getMetadata("base_path", controller);
      const routers: Router[] = Reflect.getMetadata("routers", controller);
      const express_router = express.Router();
      for (const router of routers) {
        express_router[router.method](
          router.path,
          instance[router.handler_name]
        ).bind(instance);
        info.push({
          api: `${router.method.toUpperCase()} ${base_path}${router.path}`,
          handler: `${controller.name}.${router.handler_name}`,
        });
      }
      this.app.use(base_path, express_router);
    }
    console.table(info);
  }
}
