import { AddFriendEntity } from "../../../domain/entities/friend/AddFriendEntity";
import { DeleteFriendEntity } from "../../../domain/entities/friend/DeleteFriendEntity";
import { UserFriendRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserFriendRepositorySchema";
import { UserFriendModel } from "../../models/userFriend/UserFriendModel";

/**
 * Repository InMemory
 */
export class InMemoryUserFriendRepository implements UserFriendRepositorySchema {  
  
  private userFriends: Array<UserFriendModel> = [];

  /**
   * Ajout d'un ami
   * @param {AddFriendEntity} addFriend 
   * @returns {Promise<UserFriendModel>}
   */
  async addFriend(addFriend: AddFriendEntity): Promise<UserFriendModel> {
    const id = this.userFriends.length === 0 ? 1 : Math.max(...this.userFriends.map(x=>Number(x.id))) + 1;

    const userFriend = {
      id: id.toString(),
      userId: addFriend.userId,
      friendEmail: addFriend.friendEmail,
      friendId: addFriend.friendId,
      friendName: addFriend.friendName,
      createdAt: addFriend.createdAt,
      updatedAt: addFriend.updatedAt
    }

    this.userFriends.push(userFriend);
    return userFriend;
  }

  /**
   * Récupération amis d'un utilisateur
   * @param {string} userId 
   * @returns {Promise<UserFriendModel[]>}
   */
  async findAllFriendByUserId(userId: string): Promise<UserFriendModel[]> {
    return this.userFriends.filter(friend=> friend.userId === userId);
  }

  
  /**
   * Recherche de 1 friend
   * @param {{userId: string, friendId: string}} findFriend
   * @returns {Promise<UserFriendModel>}
   */
  async findOneFriendByUserId(findFriend: { userId: string; friendId: string; }): Promise<UserFriendModel|null> {
    const findOneFriend = this.userFriends.find(friend=> (friend.userId === findFriend.userId && friend.friendId === findFriend.friendId));
    
    if(typeof findOneFriend === 'undefined'){
      return null;
    }

    return findOneFriend;
  }

  /**
   * Suppression d'un ami
   * @param {DeleteFriendEntity} deleteFriend
   * @returns {Promise<UserFriendModel|null>}
   */
  async deleteFriendRelation(deleteFriend: DeleteFriendEntity): Promise<UserFriendModel|null> {
    const index = this.userFriends.findIndex(x=>(x.userId === deleteFriend.userId && x.friendId === deleteFriend.friendId));

    if(index < 0) {
      return null;
    }

    const userFriend = this.userFriends[index-1];

    // Supprsion de l'item
    this.userFriends.splice(index-1, 1);

    return userFriend;
  }

  /**
   * Suppression
   */
  async deleteAll(): Promise<void> {
    this.userFriends = [];
  }

}