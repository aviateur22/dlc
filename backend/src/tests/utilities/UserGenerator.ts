import { AddUserEntity } from "../../domain/entities/user/AddUserEntity";
import { Password } from "../../domain/helpers/security/Password";
import { UserModel } from "../../infra/models/UserModel";
import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";

export class UserGenerator {
   /**
   * Todos a ajouter
   */  
   private static users: Array<AddUserEntity> = [
    {
      email: 'aviateur22@hotmail.fr',
      password: 'd',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {     
      email: 'helixia22@hotmail.fr',
      password: 'd',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  /**
   * Reset des tests User
   */
  static async resteUser() {
    await UserGenerator.deleteUsers();
    await UserGenerator.saveUsers();
  }
  /**
   * Sauvegarde users
   */
  private static async saveUsers(): Promise<void> {

    for(let user of this.users) {
      const hashPassword = await Password.hashPassword(user.password);
      await RepositoryServiceImpl.getRepository().userRepository.save({
        email: user.email,
        password: hashPassword,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });             
    }
  }

  /**
   * Supp. users
   */
  private static async deleteUsers(): Promise<void> {
    await RepositoryServiceImpl.getRepository().userRepository.deleteAll();
  }
}