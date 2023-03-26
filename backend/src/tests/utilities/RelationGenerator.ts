import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";

export class RelationGenerator {
  /**
   * Suppresion de toutes les relations users-friends
   */
  static async deleteAllRelations(): Promise<void> {
    await RepositoryServiceImpl.getRepository().relationRepository.deleteAll();
  }
}