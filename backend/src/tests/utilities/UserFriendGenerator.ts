import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";

export class UserFriendGenerator {
  /**
   * Suppresion de toutes les relations users-friends
   */
  static async deleteAllUserFriendRelations(): Promise<void> {
    await RepositoryServiceImpl.getRepository().userFriendRepository.deleteAll();
  }
}