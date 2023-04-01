import { UserFriendModel } from "../models/userFriend/UserFriendModel";

/**
 * UserModel Mapper
 */
export class UserFriendModelMapper {
  /**
   * UserFriendModel
   * @param friendEmail 
   * @param data 
   * @returns {UserFriendModel}
   */
  static getUserFriendModel(data: any): UserFriendModel {
    return new UserFriendModel({
      id: data.id,
      userId: data.user_id,
      friendId: data.friend_id,
      friendEmail: data.email,
      friendName: data.friend_name,
      relationId: data.relation_id,
      relationAccepted: data.is_relation_accepted ? data.is_relation_accepted : false,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    })
  }

  /**
   * UserFriendModel Array
   * @param {Array<any>} datas 
   * @returns {Array<UserFriendModel>}
   */
  static getUserFriendsModel(datas: Array<any>): Array<UserFriendModel> {
    return datas.map(data=>{
      return UserFriendModelMapper.getUserFriendModel(data);
    })
  }
}