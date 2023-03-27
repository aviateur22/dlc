import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";

export class RelationGenerator {
  /**
   * Suppresion de toutes les relations users-friends
   */
  static async deleteAllRelations(): Promise<void> {
    await RepositoryServiceImpl.getRepository().relationRepository.deleteAll();
  }

  static async addRelation(): Promise<void> {
    
    // Ajout ami user1
    const addFriendRelation1 = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail: 'helixia22@hotmail.fr',
      friendName: 'céline',
      userId: '1'
    });

  }
}