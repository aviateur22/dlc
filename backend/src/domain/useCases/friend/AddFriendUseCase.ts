import { FriendRelationException } from "../../../exceptions/FriendRelationException";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserFriendModel } from "../../../infra/models/userFriend/UserFriendModel";
import { UserFriendMapper } from "../../dtos/UserFriendMapper";
import { AddFriendEntity } from "../../entities/friend/AddFriendEntity";
import { UserFriendEntity } from "../../entities/friend/UserFriendEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";
import { Friends } from "../helpers/Friends";

/**
 * AddFriendUsecase
 */
export class AddFriendUseCase extends UseCaseModel {

  /**
   * Ajout friend relation user->friend et friend->user
   * @param addFriend 
   * @returns 
   */
  async execute(addFriend: Partial<AddFriendEntity>): Promise<Array<UserFriendEntity>> {

    // Recherche existance email
    const findFriend = await this.repositories.userRepository.findByEmail(addFriend.friendEmail!);
    // Récuparation des produits
    const productsId = await this.repositories.productUserRepository.findByUserId('2').then(products=>{
      return products.map(product=>product.id)
    });
   
   
  
    if(!findFriend) {
      // Todo remplacer par l'ajout d'un compte et envoie d'email 
      throw new UserNotFindException(messages.message.emailNotFind);
    }

    // Vérifie que la relation n'existe pas
    const findFriendRelation = await this.repositories.userFriendRepository.findOneFriendByUserId({
      userId: addFriend.userId!,
      friendId: findFriend.id
    })
    
    if(findFriendRelation){
      throw new FriendRelationException(messages.message.friendRelationAlreadyExist)
    }
    
    // Ajout relation user->ami et ami->user    
    const addFriendRelation = await this.repositories.userFriendRepository.addFriend(new AddFriendEntity({
      userId: addFriend.userId!,
      friendId: findFriend.id!,
      friendEmail: findFriend.email!,
      friendName: addFriend.friendName!
    }));    
    
    // Ajout des produits utilisateur aux amis
    for(let friend of addFriendRelation) {
      await Friends.addAllProductsToOneFriend(friend.userId, friend.friendId); 
      
    }   

    return UserFriendMapper.getUserFriendsEntities(addFriendRelation);
  }
}