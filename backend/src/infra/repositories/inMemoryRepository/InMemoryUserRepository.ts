import { AddUserEntity } from "../../../domain/entities/user/AddUserEntity";
import { FindUserEntity } from "../../../domain/entities/user/FindUserEntity";
import { UserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserRepositorySchema";
import { UserModel } from "../../models/UserModel";

/**
 * User repo InMemory
 */
export class InMemoryUserRepository implements UserRepositorySchema {

   // Liste utilisateur
   protected users: Array<UserModel> = [];
   
  /**
   * FindAll users
   * @returns 
   */
  async findAll(): Promise<UserModel[]> {
   return this.users;
  }
 
  /**
   * FindByEmail
   * @param {Partial<FindUserEntity>} user 
   * @returns {Promise<UserModel|null>}
   */
  async findByEmail(findUser: Partial<FindUserEntity>): Promise<UserModel|null> {
    const findUserInArray = await this.users.find(user=>user.email === findUser.email);

    if(typeof findUserInArray === 'undefined') {
      return null;
    }

    return findUserInArray;
  }


  /**
   * Save
   * @param {AddUserEntity} addUser 
   * @returns {Promise<UserModel>}
   */
  async save(addUser: AddUserEntity): Promise<UserModel> {
    const id =  this.users.length === 0 ? 1 : Math.max(...this.users.map(user=>Number(user.id))) + 1;

    this.users.push({id: id.toString(), ...addUser});

    return { id: id.toString(), ...addUser }
  }

  /**
   * Suppr.
   */
  async deleteAll(): Promise<void> {
    this.users = [];
  }

}