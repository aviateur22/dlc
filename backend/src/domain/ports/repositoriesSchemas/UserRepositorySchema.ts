import { UserModel } from "../../../infra/models/UserModel";
import { AddUserEntity } from "../../entities/user/AddUserEntity";

export interface UserRepositorySchema {
  /**
   * Sauvegarde utilisateur
   * @param {Partial<AddUserEntity>} user 
   */
  save(user: Partial<AddUserEntity>): Promise<UserModel>;
}