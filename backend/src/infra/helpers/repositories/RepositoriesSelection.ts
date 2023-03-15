import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { UserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserRepositorySchema";
import { InMemoryToDoRepository } from "../../repositories/inMemoryRepository/InMemoryToDoRepository";
import { InMemoryUserRepository } from "../../repositories/inMemoryRepository/InMemoryUserRepository";
import { PostgreSQLToDoRepository } from "../../repositories/postgreSQL/PostgreSQLToDoRepository";
import { PostgreSQLUserRepository } from "../../repositories/postgreSQL/PostgreSQLUserRepository";
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
    const inMemoryUserRepository: UserRepositorySchema = new InMemoryUserRepository();
    return new Repositories(inMemoryToDoRepository, inMemoryUserRepository);
  }

  /**
   * Repository PostgreSQL
   * @returns { Repositories }
   */
  private sourcePostgreSQL(): Repositories {
    const postgreSQLItemRepository: TodoRepositorySchema = new PostgreSQLToDoRepository();
    const postgreSQLuserRepository: UserRepositorySchema = new PostgreSQLUserRepository();

    return new Repositories(postgreSQLItemRepository, postgreSQLuserRepository);
  }
}

export { RepositoriesSelection }