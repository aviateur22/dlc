import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserFriendModel } from "../../../infra/models/userFriend/UserFriendModel";
import { UserFriendMapper } from "../../dtos/UserFriendMapper";
import { DeleteFriendEntity } from "../../entities/friend/DeleteFriendEntity";
import { UserFriendEntity } from "../../entities/friend/UserFriendEntity";
import messages from "../../messages/messages";
import { Friends } from "../helpers/Friends";
import { UseCaseModel } from "../UseCaseModel";

export class DeleteFriendUseCase extends UseCaseModel {

  /**
   * Suppression d'un ami
   * @param {DeleteFriendEntity} deleteFriend 
   * @returns 
   */
  async execute(deleteFriend: DeleteFriendEntity): Promise<Array<UserFriendEntity>> {

    deleteFriend = new DeleteFriendEntity(deleteFriend);
    
    // Vérification relation user->friend
    await Friends.deleteFriendVerification(deleteFriend.userId, deleteFriend.friendId);

    // Vérification relation friend->user 
    await Friends.deleteFriendVerification(deleteFriend.friendId, deleteFriend.userId);

    // Suppression relation user->friend - friend->user
    const deleteFriendRelations = await this.repositories.userFriendRepository.deleteFriendRelation(deleteFriend);

    if(!deleteFriendRelations){
      throw new UserNotFindException(messages.message.userFriendNotFind);
    }
    
    for(let userFriend of deleteFriendRelations) {

      // Récupération des produits utilisateur 
      let findAllUserProduct = await this.repositories.productUserRepository.findByUserId(userFriend.userId).then(result=>{
        return result.map(x=>x.productId)
      });
      console.log(findAllUserProduct);
      console.log(userFriend.friendId)
      // Suppression  des relations friend-produits
      await this.repositories.productUserRepository.deleteMultipleProductsByUserId(findAllUserProduct, userFriend.friendId);
    }
    console.log(deleteFriendRelations)
    return UserFriendMapper.getUserFriendsEntities(deleteFriendRelations);
  }
}