import { BaseService } from '../interfaces/BaseService';
import { Todo } from '../models/Todo';
import { TodoRepository } from '../repositories/TodoRepository';

export class TodoService implements BaseService<Todo> {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async create(todo: Todo): Promise<Todo> {
    return this.repository.create(todo);
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
}
