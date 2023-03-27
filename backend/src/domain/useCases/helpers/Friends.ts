import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { FriendRelationException } from "../../../exceptions/FriendRelationException";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserFriendModel } from "../../../infra/models/userFriend/UserFriendModel";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { AddFriendProductEntity } from "../../entities/product/AddFriendProductEntity";
import messages from "../../messages/messages";

export class Friends {

  /**
   * Vérification Relation user->friend avant supprssion
   * @param {string} userId 
   * @param {string} friendId 
   */
  static async deleteFriendVerification(userId: string, friendId: string) {
    // Vérification Existance Friend
    const findFriend = await RepositoryServiceImpl.getRepository().userRepository.findById(friendId);
    
    if(!findFriend) {
      throw new UserNotFindException(messages.message.userNotFind);
    }

    // Vérification existence friendRelation
    const findFriendRelation = await Friends.checkFriendRelation(userId, friendId);

    if(!findFriendRelation){
      throw new FriendRelationException(messages.message.friendRelationMissing)
    }
  }

  /**
   * Vérification si existance relation user->friend avant ajout d'une nouvelle relation
   * @param {string} userId 
   * @param {string} friendEmail 
   */
  static async addFriendRelationVerification(userId: string, friendEmail: string) {
    // Recherche existance email
    const findFriend = await RepositoryServiceImpl.getRepository().userRepository.findByEmail(friendEmail);
      
    if(!findFriend) {
      // Todo remplacer par l'ajout d'un compte et envoie d'email 
      throw new UserNotFindException(messages.message.emailNotFind);
    }

    // Vérification existence friendRelation
    const findFriendRelation = await Friends.checkFriendRelation(userId, findFriend.id);

    if(findFriendRelation){
      throw new FriendRelationException(messages.message.friendRelationAlreadyExist)
    }
  }

  /**
   * Vérirication Relation user->friend
   * @param {string} userId 
   * @param {string} friendId 
   * @returns {Promise<UserFriendModel|null> }
   */
  private static async checkFriendRelation(userId: string, friendId: string): Promise<UserFriendModel|null> {   

    // Vérifie que la relation n'existe pas
    const findFriendRelation = await RepositoryServiceImpl.getRepository().userFriendRepository.findOneFriendByUserId({
      userId: userId,
      friendId: friendId
    });

    return findFriendRelation
  }
} 