import { UserFriendModel } from "../../infra/models/userFriend/UserFriendModel";
import { UserFriendEntity } from "../entities/friend/UserFriendEntity";

/**
 * Mapper USerFriendEntity
 */
export class UserFriendMapper {

  /**
   * Mapper UserFriendModel ver UserFriendEntity
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
      relationId: userFriend.relationId,
      isFriendAccepted: userFriend.isFriendAccepted,
      isNewFriend: userFriend.isNewFriend,
      createdAt: userFriend.createdAt,
      updatedAt: userFriend.updatedAt
    });
  }

  /**
   * Mapper UserFriendModel[] ver UserFriendEntity[]
   * @param {Array<UserFriendModel>} usersFriends
   * @returns {Array<UserFriendEntity>}
   */
  static getUserFriendsEntities(usersFriends: Array<UserFriendModel>): Array<UserFriendEntity> {
    return usersFriends.map(userFriend=>UserFriendMapper.getUserFriendEntity(userFriend));
  }
}