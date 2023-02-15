import type { Request, Response } from "express";

import { Server } from "../packages/common/classes/server";
import { Controller } from "../packages/common/decorators/controller";
import { Get, Post } from "../packages/common/decorators/handlers";

@Controller("/todo")
export default class TodoController {
  private todos: string[] = ["Learn Express", "Learn TypeScript"];

  @Get("/")
  public index(req: Request, res: Response): void {
    res.json({ todos: this.todos });
  }

  @Get("/:id")
  public find(req: Request, res: Response): void {
    const { id } = req.params;
    res.json({ todo: this.todos[parseInt(id)] });
  }

  @Post("/")
  public create(req: Request, res: Response): void {
    const { todo } = req.body;
    this.todos.push(todo);
    res.status(204).json({ todos: this.todos });
  }
}

const controllers = [TodoController];
const app = new Server(controllers);
app.start(3000);
