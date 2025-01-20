export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>
  update(entity: T): Promise<void>
  findOne(entityId: string): Promise<T | null>
  findAll(): Promise<Array<T>>
  remove(entityId: string): Promise<void>
}