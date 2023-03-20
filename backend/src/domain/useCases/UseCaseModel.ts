import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";

export class UseCaseModel {
  // Acces au repositories
  protected repositories = RepositoryServiceImpl.getRepository();
}