import { BaseService } from "../interfaces/BaseService";
import { Todo } from "../models/Todo";
import { TodoRepository } from "../repositories/TodoRepository";
import { v4 as uuidv4 } from "uuid";

export class TodoService implements BaseService<Todo> {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async create(
    todo: Omit<Todo, "id" | "createdAt" | "updatedAt">
  ): Promise<Todo> {
    const newTodo: Todo = {
      ...todo,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      taskDueAt: todo.taskDueAt ? todo.taskDueAt : null,
    };
    return this.repository.create(newTodo);
  }

  async read(id: string): Promise<Todo | null> {
    return this.repository.read(id);
  }

  async update(id: string, todo: Todo): Promise<Todo | null> {
    return this.repository.update(id, todo);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
  async getAll(): Promise<Todo[]> {
    return this.repository.getAll();
  }
}
