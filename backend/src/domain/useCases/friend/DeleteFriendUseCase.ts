import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserFriendMapper } from "../../dtos/UserFriendMapper";
import { DeleteFriendEntity } from "../../entities/friend/DeleteFriendEntity";
import { UserFriendEntity } from "../../entities/friend/UserFriendEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";

export class DeleteFriendUseCase extends UseCaseModel {

  /**
   * 
   * @param friendId 
   * @returns 
   */
  async execute(deleteFriend: DeleteFriendEntity): Promise<UserFriendEntity> {

    deleteFriend = new DeleteFriendEntity(deleteFriend);

    // Vérification Existance Friend
    const findFriend = await this.repositories.userRepository.findById(deleteFriend.friendId);
    
    // Récupération des produits utilisateur 
    const findAllUserProduct = await this.repositories.productRepository.findByUserId(deleteFriend.userId).then(result=>{
      return result.map(x=>x.id)
    })


    if(!findFriend) {
      throw new UserNotFindException(messages.message.userNotFind);
    }

    // Vérification existance relation
    const findFriendUser = await this.repositories.userFriendRepository.findOneFriendByUserId(deleteFriend);

    if(!findFriendUser) {
      throw new UserNotFindException(messages.message.userFriendNotFind);
    }

    // Suppression relation user-friend
    await this.repositories.userFriendRepository.deleteFriendRelation(deleteFriend);

    // Suppression  des relations friend-produits
    await this.repositories.productUserRepository.deleteMultipleProductsByUserId(findAllUserProduct, deleteFriend.friendId);

    return UserFriendMapper.getUserFriendEntity(findFriendUser);
  }
}