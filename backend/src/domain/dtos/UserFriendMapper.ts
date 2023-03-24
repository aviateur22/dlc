import { UserFriendModel } from "../../infra/models/userFriend/UserFriendModel";
import { UserFriendEntity } from "../entities/friend/UserFriendEntity";

/**
 * Mapper USerFriendEntity
 */
export class UserFriendMapper {

  /**
   * 
   * @param {UserFriendModel} userFriend 
   * @returns {UserFriendEntity}
   */
  static getUserFriendEntity(userFriend: UserFriendModel): UserFriendEntity {
    return new UserFriendEntity({
      id: userFriend.id,
      userId: userFriend.userId,
      friendId: userFriend.friendId,
      friendName: userFriend.friendName,
      friendEmail: userFriend.friendEmail,
      createdAt: userFriend.createdAt,
      updatedAt: userFriend.updatedAt
    });
  }
}