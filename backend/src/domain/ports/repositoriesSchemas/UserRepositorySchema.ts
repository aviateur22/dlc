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
   * @param {Partial<FindUserEntity> } user 
   */
  findByEmail(user: Partial<FindUserEntity>): Promise<UserModel|null>;

  /**
   * Suppression 
   */
  deleteAll(): Promise<void>;
}