import { ImageRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ImageRepositorySchema";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
import { TodoRepositorySchema } from "../../../domain/ports/repositoriesSchemas/TodoRepositorySchema";
import { UserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserRepositorySchema";
import { InMemoryImagerepository } from "../../repositories/inMemoryRepository/InMemoryImageRepository";
import { InMemoryProductRepository } from "../../repositories/inMemoryRepository/InMemoryProductRepository";
import { InMemoryProductUserRepository } from "../../repositories/inMemoryRepository/InMemoryProductUserRepository";
import { InMemoryToDoRepository } from "../../repositories/inMemoryRepository/InMemoryToDoRepository";
import { InMemoryUserRepository } from "../../repositories/inMemoryRepository/InMemoryUserRepository";
import { PostgreSQLImageRepository } from "../../repositories/postgreSQL/PostgreSQLImageRepository";
import { PostgreSQLProductRepository } from "../../repositories/postgreSQL/PostgreSQLProductRepository";
import { PostgreSQLProductUserRepository } from "../../repositories/postgreSQL/PostgreSQLProductUserRepository";
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
    const inMemoryProductRepository: ProductRepositorySchema = new InMemoryProductRepository();
    const inMemoryImageRepository: ImageRepositorySchema = new InMemoryImagerepository();
    const inMemoryProductUserRepository: ProductUserRepositorySchema = new InMemoryProductUserRepository;
    
    return new Repositories(
      inMemoryToDoRepository, 
      inMemoryUserRepository, 
      inMemoryProductRepository,
      inMemoryImageRepository,
      inMemoryProductUserRepository
    );
  }

  /**
   * Repository PostgreSQL
   * @returns { Repositories }
   */
  private sourcePostgreSQL(): Repositories {    
    const postgreSQLItemRepository: TodoRepositorySchema = new PostgreSQLToDoRepository();
    const postgreSQLUserRepository: UserRepositorySchema = new PostgreSQLUserRepository();
    const postgreSQLProductRepository: ProductRepositorySchema = new PostgreSQLProductRepository();    
    const postgreSQLImageRepository: ImageRepositorySchema = new PostgreSQLImageRepository();
    const postgreSQLProductUserRepository: ProductUserRepositorySchema = new PostgreSQLProductUserRepository();
    
    return new Repositories(
      postgreSQLItemRepository, 
      postgreSQLUserRepository, 
      postgreSQLProductRepository,
      postgreSQLImageRepository,
      postgreSQLProductUserRepository
    );
  }
}

export { RepositoriesSelection }