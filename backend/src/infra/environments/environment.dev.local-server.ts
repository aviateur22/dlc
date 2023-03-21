import { LoggerSource } from "../helpers/logger/LoggerSource";
import { RepositorySources } from "../helpers/repositories/RepositorySources";
import { ServerSource } from "../helpers/server/ServerSource";
import { LoggerServiceImpl } from "../services/logger/LoggerServiceImpl";
import { RepositoryServiceImpl } from "../services/repository/RepositoryServiceImpl";
import { ServerServiceImpl } from "../services/server/ServerServiceImpl";

/**
 * Dev - webServer
 */
export default {
  server: ServerServiceImpl.setServer(ServerSource.express),
  repositories: RepositoryServiceImpl.setRepositories(RepositorySources.postgreSQL),
  logger: LoggerServiceImpl.setLogger(LoggerSource.bunyan)
}