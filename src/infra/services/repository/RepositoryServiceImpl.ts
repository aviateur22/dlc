import { Repositories } from "../../helpers/repositories/Repositories";
import { RepositoriesSelection } from "../../helpers/repositories/RepositoriesSelection";
import { RepositorySources } from "../../helpers/repositories/RepositorySources";

/**
 * Implementation de la base de données
 */
class RepositoryServiceImpl {
  
  /**
   * Repositories actif pour le projet
   */
  private static repositories: Repositories;

  /**
   * Renvoies la base de données selectionnée
   * @returns { Repositories }
   */
  static getRepositories(): Repositories {

    if(!RepositoryServiceImpl.repositories) {
      const repositoriesSelection = new RepositoriesSelection();
      RepositoryServiceImpl.repositories = repositoriesSelection.getRepositories(RepositorySources.inMemory);
    }

    return RepositoryServiceImpl.repositories;
  }
}

export { RepositoryServiceImpl }