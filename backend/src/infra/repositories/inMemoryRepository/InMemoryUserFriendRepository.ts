import { AddFriendEntity } from "../../../domain/entities/friend/AddFriendEntity";
import { DeleteFriendEntity } from "../../../domain/entities/friend/DeleteFriendEntity";
import { UserFriendRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserFriendRepositorySchema";
import { UserFriendModel } from "../../models/userFriend/UserFriendModel";
import functionsHelpers from './helpers/FactorisationFunction';

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
  async addFriend(addFriend: AddFriendEntity): Promise<Array<UserFriendModel>> {
    
    const addFriendArray: Array<UserFriendModel> = [];
    const userFriendRelation1 = await functionsHelpers.addUserFriendRelation(this.userFriends, {      
      userId: addFriend.userId,
      friendEmail: addFriend.friendEmail,
      friendId: addFriend.friendId,
      friendName: addFriend.friendName,
      relationId: addFriend.relationId,
      createdAt: addFriend.createdAt,
      updatedAt: addFriend.updatedAt,
      isFriendAccepted: true,
      isNewFriend: false
    });

    const userFriendRelation2 = await functionsHelpers.addUserFriendRelation(this.userFriends, {      
      userId: addFriend.friendId,
      friendEmail: addFriend.friendEmail,
      friendId: addFriend.userId,
      relationId: addFriend.relationId,
      friendName: addFriend.friendName,
      createdAt: addFriend.createdAt,
      updatedAt: addFriend.updatedAt,
      isFriendAccepted: false,
      isNewFriend: true

    });

    this.userFriends.push(userFriendRelation1, userFriendRelation2);
    addFriendArray.push(userFriendRelation1, userFriendRelation2);


    return addFriendArray;
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
   * Liste des amis ayant validée la relation
   * @param {string} userId
   * @returns Promise<UserFriendModel[]>
   */
  findAllFriendsWithAcceptedRelation(userId: string): Promise<UserFriendModel[]> {
    throw new Error("Method not implemented.");
  } 

  /**
   * Recherche des amis suivants une relation
   * @param {string} relationId 
   * @returns {Promise<Array<UserFriendModel>>}
   */
  async findByRelationId(relationId: string): Promise<UserFriendModel[]> {
    const friendsRelations = this.userFriends.filter(x=>x.relationId === relationId);
    return friendsRelations;
  }  

  /**
   * Suppression d'un ami
   * @param {DeleteFriendEntity} deleteFriend
   * @returns {Promise<UserFriendModel|null>}
   */
  async deleteFriendRelation(deleteFriend: DeleteFriendEntity): Promise<Array<UserFriendModel>|null> {
    const friendUserArray: Array<UserFriendModel> = [];

    const userFriendDelete1: UserFriendModel|null = functionsHelpers.deleteUserFriendRelation(this.userFriends, deleteFriend.userId, deleteFriend.friendId );
    const userFriendDelete2: UserFriendModel|null = functionsHelpers.deleteUserFriendRelation(this.userFriends, deleteFriend.friendId, deleteFriend.userId );


    if(userFriendDelete1) {
      friendUserArray.push(userFriendDelete1);
    }
    
    
    if(userFriendDelete2) {
      friendUserArray.push(userFriendDelete2);
    } 
    
    return friendUserArray;
  }

  /**
   * Suppression
   */
  async deleteAll(): Promise<void> {
    this.userFriends = [];
  }



}