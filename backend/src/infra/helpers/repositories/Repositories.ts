import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema"
import { UserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserRepositorySchema";

/**
 * Regroupement des repositories
 */
class Repositories {
  // A faire: a supprimer
  public readonly todoRepository: TodoRepositorySchema;

  // repository User
  public readonly userRepository: UserRepositorySchema;

  constructor(todoRepository: TodoRepositorySchema, userRepository: UserRepositorySchema) {
    // A faire: a supprimer
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
  }
}
export { Repositories }