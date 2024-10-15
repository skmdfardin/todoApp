import { Router } from "express";
import { BaseApi } from "../interfaces/BaseApi";
import { TodoController } from "../controllers/TodoController";
import { ValidateRequest } from "../middlewares/validateRequest";
import Joi from "joi";

const todoSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).allow(""),
  completed: Joi.boolean().required(),
  taskDueAt: Joi.date().iso().optional().allow(null),
});

const todoUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().max(500).allow(""),
  completed: Joi.boolean(),
});

export class TodoApi implements BaseApi {
  private router: Router;
  private controller: TodoController;

  constructor() {
    this.router = Router();
    this.controller = new TodoController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post(
      "/",
      new ValidateRequest(todoSchema).handle,
      this.controller.create.bind(this.controller)
    );
    this.router.get("/:id", this.controller.read.bind(this.controller));
    this.router.put(
      "/:id",
      new ValidateRequest(todoUpdateSchema).handle,
      this.controller.update.bind(this.controller)
    );
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }

  getRouter(): Router {
    return this.router;
  }
}
