import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";
import { UseCases } from "../helpers/useCases/UseCases";

export class UseCaseModel {
  // Acces au repositories
  protected repositories = RepositoryServiceImpl.getRepository();

  // UseCase de disponible
  protected useCases: UseCases;

  constructor(useCases: UseCases) {
    this.useCases = useCases;
  }
}