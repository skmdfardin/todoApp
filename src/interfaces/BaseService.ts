export interface BaseService<T> {
  create(item: T): Promise<T>;
  read(id: string): Promise<T | null>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
