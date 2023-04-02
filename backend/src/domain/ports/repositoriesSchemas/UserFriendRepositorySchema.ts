import { UserFriendModel } from "../../../infra/models/userFriend/UserFriendModel";
import { AddFriendEntity } from "../../entities/friend/AddFriendEntity";
import { DeleteFriendEntity } from "../../entities/friend/DeleteFriendEntity";

export interface UserFriendRepositorySchema {

  /**
   * Ajout d'un ami
   * @param addFriend 
   * @returns {Promise<UserFriendModel>} 
   */
  addFriend(addFriend: AddFriendEntity): Promise<Array<UserFriendModel>>;

  /**
   * Suppression des liens users-friends
   */
  deleteAll(): Promise<void>;

  /**
   * Suppression d'un friend
   * @param {deleteFriendEntity} deleteFriend 
   */
  deleteFriendRelation(deleteFriend: DeleteFriendEntity): Promise<Array<UserFriendModel>|null>;

  /**
   * Recerche des amis d'une personne
   * @param {string} userId 
   * @returns {Promise<Array<UserFriendModel>>}
   */
  findAllFriendByUserId(userId: string): Promise<Array<UserFriendModel>>;

  /**
   * Recherhce ami avec relation acceptée
   * @param {string} userId
   * @returns {Promise<Array<UserFriendModel>>}
   */
  findAllFriendsWithAcceptedRelation(userId: string): Promise<Array<UserFriendModel>>;

  /**
   * Recherche de 1 friend
   * @param {{userId: string, friendId: string}} findFriend
   * @returns {Promise<UserFriendModel>}
   */
  findOneFriendByUserId(findFriend: {userId: string, friendId: string} ): Promise<UserFriendModel|null>;

  /**
   * Recherche des amis suivants une relation
   * @param {string} relationId 
   * @returns {Promise<Array<UserFriendModel>>}
   */
  findByRelationId(relationId: string): Promise<Array<UserFriendModel>>

}