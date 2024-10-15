import { Request, Response, NextFunction } from "express";
import { BaseController } from "../interfaces/BaseController";
import { TodoService } from "../services/TodoService";
import { Todo } from "../models/Todo";

export class TodoController implements BaseController {
  private service: TodoService;

  constructor() {
    this.service = new TodoService();
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const todo: Todo = req.body;
      const result = await this.service.create(todo);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.service.read(id);
      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Todo not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const todo: Todo = req.body;
      const result = await this.service.update(id, todo);
      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Todo not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.service.delete(id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send("Todo not found");
      }
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const todos = await this.service.getAll();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }
}
