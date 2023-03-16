import { UserModel } from "../../infra/models/UserModel";
import { UserEntity } from "../entities/user/UserEntity";

export class UserMapper {
  
  /**
   * Mapp vers UserEntity
   * @param { UserModel } user 
   * @returns { UserEntity }
   */
  static userEntityMapper(user: UserModel): UserEntity { 
    const id = user.id.toString();
    return new UserEntity({ id, ...{user} });
  }
}