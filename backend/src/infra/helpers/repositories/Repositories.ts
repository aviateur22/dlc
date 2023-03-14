import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema"

/**
 * Regroupement des repositories
 */
class Repositories {
  public readonly todoRepository: TodoRepositorySchema;

  constructor(todoRepository: TodoRepositorySchema) {
    this.todoRepository = todoRepository;
  }
}
export { Repositories }