import { BaseRepository } from "../interfaces/BaseRepository";
import { Todo } from "../models/Todo";
import { createClient } from "redis";

export class TodoRepository implements BaseRepository<Todo> {
  private client;

  constructor() {
    this.client = createClient();
    this.client.connect();
  }

  async create(todo: Todo): Promise<Todo> {
    await this.client.set(`todo:${todo.id}`, JSON.stringify(todo));
    return todo;
  }

  async read(id: string): Promise<Todo | null> {
    const todo = await this.client.get(`todo:${id}`);
    return todo ? JSON.parse(todo) : null;
  }

  async update(id: string, todo: Todo): Promise<Todo | null> {
    const exists = await this.client.exists(`todo:${id}`);
    if (exists) {
      await this.client.set(`todo:${id}`, JSON.stringify(todo));
      return todo;
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.client.del(`todo:${id}`);
    return result === 1;
  }
  async getAll(): Promise<Todo[]> {
    const keys = await this.client.keys("todo:*");
    const todos = await Promise.all(keys.map((key) => this.client.get(key)));
    return todos
      .filter((todo): todo is string => todo !== null)
      .map((todo) => JSON.parse(todo));
  }
}
