import express from "express";
import type { HttpRoute } from "../types/http";

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

  public bind_routes<IController>(controllers: { new (): IController }[]) {
    for (const controller of controllers) {
      const instance = new controller() as any;
      const path = Reflect.getMetadata("path", controller);
      const routes = Reflect.getMetadata("routes", controller) as HttpRoute[];
      const router = express.Router();
      console.table(routes)
      for (const route of routes) {
        const handler = instance[route.handler];
        router[route.method](route.path, handler);
      }
      this.app.use(path, router)
    }
  }
}
