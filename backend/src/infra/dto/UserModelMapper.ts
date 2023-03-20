import { UserModel } from "../models/UserModel";

export class UserModelMapper {

  /**
   * UserModelMapper
   * @param {any} data 
   * @returns {UserModel}
   */
  static getUserModel(data: any): UserModel {
    return new UserModel({
      id: data.id.toString(), 
      email: data.email,
      password: data.password,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  }

  /**
   * UsersModelMapper
   * @param {Array<any>} datas
   * @returns {Array<UserModel>} 
   */
  static getUserModelArray(datas: Array<any>): Array<UserModel> {
    const users = datas.map(data=>UserModelMapper.getUserModel(data));
    return users
  }
 
}