import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { InMemoryToDoRepository } from "../../repositories/inMemoryRepository/InMemoryToDoRepository";
import { PostgreSQLToDoRepository } from "../../repositories/postgreSQL/PostgreSQLToDoRepository";
import { Repositories } from "./Repositories";
import { RepositorySources } from "./RepositorySources";

class RepositoriesSelection {

  /**
   * Selection des repositories en fonction de la source
   * @param { number } repositorySource 
   * @returns { Repositories }
   */
  getRepositories(repositorySource: number): Repositories {
    switch (repositorySource) {
      case RepositorySources.inMemory:
        return this.sourceInMemory();
      break;
      case RepositorySources.postgreSQL:
        return this.sourcePostgreSQL();      
      break;
      default:
        return this.sourceInMemory();
      break;
    }
  }

  /**
   * Selection InMemory Repository
   * @returns { Repositories }
   */
  private sourceInMemory(): Repositories {
    const inMemoryToDoRepository: TodoRepositorySchema = new InMemoryToDoRepository();
    return new Repositories(inMemoryToDoRepository);
  }

  /**
   * Repository PostgreSQL
   * @returns { Repositories }
   */
  private sourcePostgreSQL(): Repositories {
    const postgreSQLItemRepository: TodoRepositorySchema = new PostgreSQLToDoRepository();
    return new Repositories(postgreSQLItemRepository);
  }
}

export { RepositoriesSelection }