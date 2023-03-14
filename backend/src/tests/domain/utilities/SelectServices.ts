import { LoggerSource } from "../../../infra/helpers/logger/LoggerSource";
import { RepositorySources } from "../../../infra/helpers/repositories/RepositorySources";
import { LoggerServiceImpl } from "../../../infra/services/logger/LoggerServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";

/**
 * Selection des repo pour les tests
 */
class SelectServices {

  /**
   * Selection repo
   */
  static SelectRepositoriesSource() {
    RepositoryServiceImpl.setRepositories(RepositorySources.inMemory);  
  }

  /**
   * Selection Logger
   */
  static selectLoggerSource() {
    LoggerServiceImpl.setLogger(LoggerSource.bunyan);
  }
}

export { SelectServices }
