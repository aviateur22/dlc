import { UserModel } from "../../../infra/models/UserModel";
import { AddUserEntity } from "../../entities/user/AddUserEntity";
import { FindUserEntity } from "../../entities/user/FindUserEntity";

export interface UserRepositorySchema {
  /**
   * Sauvegarde utilisateur
   * @param {Partial<AddUserEntity>} user 
   */
  save(user: Partial<AddUserEntity>): Promise<UserModel>;

  /**
   * findAll user
   */
  findAll(): Promise<Array<UserModel>>

  /**
   * Recherche par email
   * @param { string} userEmail 
   */
  findByEmail(userEmail: string): Promise<UserModel|null>;

  /**
   * Recherche par id
   * @param {string} userId 
   */
  findById(userId: string): Promise<UserModel|null>;

  /**
   * Suppression 
   */
  deleteAll(): Promise<void>;
}