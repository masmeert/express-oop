import { z } from "zod";
import type { NextFunction, Request, Response } from "express";

import { Server } from "../packages/common/classes/server";
import { Controller } from "../packages/common/decorators/controller";
import { Get, Post } from "../packages/common/decorators/handlers";

const todo_schema = z.object({ todo: z.string() });
const todos = ["Learn Express", "Learn TypeScript"];

@Controller("/todo")
export default class TodoController {
  @Get()
  public index(req: Request, res: Response): void {
    res.json({ todos });
  }

  @Get("/:id")
  public find(req: Request, res: Response): void {
    const { id } = req.params;
    res.json({ todo: todos[parseInt(id)] });
  }

  @Post()
  public create(req: Request, res: Response, next: NextFunction): void {
    const { todo } = req.body;
    todos.push(todo);
    res.status(204).json({ todos });
  }
}

const controllers = [TodoController];
const app = new Server(controllers);
app.start(3000);
