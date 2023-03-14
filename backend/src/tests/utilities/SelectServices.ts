import { LoggerSource } from "../../infra/helpers/logger/LoggerSource";
import { RepositorySources } from "../../infra/helpers/repositories/RepositorySources";
import { ServerSource } from "../../infra/helpers/server/ServerSource";
import { LoggerServiceImpl } from "../../infra/services/logger/LoggerServiceImpl";
import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";
import { ServerServiceImpl } from "../../infra/services/server/ServerServiceImpl";

/**
 * Selection des repo pour les tests
 */
class SelectServices {
  
  /**
   * Selection server
   * 
   * @returns { number }
   */
  static SelectBackend(): number {

    // Service selectionné
    const serviceSelected = ServerSource.express;

    ServerServiceImpl.setServer(serviceSelected);
    return serviceSelected;
  }
  
    
  /**
   * Selection repo
   */
  static SelectRepositoriesSource(): void {
    RepositoryServiceImpl.setRepositories(RepositorySources.postgreSQL);  
  }

  /**
   * Selection Logger
   */
  static selectLoggerSource(): void {
    LoggerServiceImpl.setLogger(LoggerSource.bunyan);
  }
}

export { SelectServices }
