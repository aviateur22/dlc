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


  async findByEmail(user: Partial<FindUserEntity>): Promise<UserModel|null> {
    const findUser = await this.users.find(user=>user.email === user.email);

    if(typeof findUser === 'undefined') {
      return null;
    }

    return findUser;
  }


  async save(addUser: AddUserEntity): Promise<UserModel> {
    const id =  this.users.length === 0 ? 1 : Math.max(...this.users.map(user=>Number(user.id))) + 1;

    this.users.push({id: id.toString(), ...addUser});

    return { id: id.toString(), ...addUser }
  }

}