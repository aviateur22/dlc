import { UserModel } from "../../infra/models/UserModel";
import { UserEntity } from "../entities/user/UserEntity";

export class UserMapper {
  
  /**
   * Mapper TodoModel vers  TodoEntity
   * @param { TodoModel } todo 
   * @returns { TodoEntity }
   */
  static userEntityMapper(user: UserModel): UserEntity {
    return new UserEntity({...user});
  }
}