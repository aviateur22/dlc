import { RepositoryException } from "../../../exceptions/RepositoryException";
import { Repositories } from "../../helpers/repositories/Repositories";
import { RepositoriesSelection } from "../../helpers/repositories/RepositoriesSelection";

/**
 * Implementation de la base de données
 */
class RepositoryServiceImpl {
  
  /**
   * Repositories actif pour le projet
   */
  private static repositories: Repositories;

  /**
   * Selection repositories
   * @returns { void }
   */
  static setRepositories(selectRepositorySource: number): void {
    
    if(typeof RepositoryServiceImpl.repositories === 'undefined') {
      const repositoriesSelection = new RepositoriesSelection();
      RepositoryServiceImpl.repositories = repositoriesSelection.getRepositories(selectRepositorySource);
    }
  }

  /**
   * Récupération du repository
   * @returns { Repositories }
   */
  static getRepository(): Repositories {

    // Repository non défini
    if(typeof RepositoryServiceImpl.repositories === 'undefined') {      
      throw new RepositoryException('no repository selected');     
    }
    return RepositoryServiceImpl.repositories

  }
}

export { RepositoryServiceImpl }