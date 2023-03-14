import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";
import { UseCases } from "../helpers/useCases/UseCases";
import { TodoRepositorySchema } from "../ports/repositoriesSchemas/TodoRepositorySchema";

/**
 * UseCaseModel  ayant l'acces au repositories
 */
class TodoUseCase {
  // Acces au repositories
  protected repositories: TodoRepositorySchema = RepositoryServiceImpl.getRepository().todoRepository;

  // UseCase de disponible
  protected useCases: UseCases;

  constructor(useCases: UseCases) {
    this.useCases = useCases;
  }
}

export { TodoUseCase }