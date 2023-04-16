import { FriendRelationException } from "../../../exceptions/FriendRelationException";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserFriendMapper } from "../../dtos/UserFriendMapper";
import { AddFriendEntity } from "../../entities/friend/AddFriendEntity";
import { UserFriendEntity } from "../../entities/friend/UserFriendEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";

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

    // Ajout de son propre email
    if(findFriend?.id === addFriend.userId) {
      // Todo remplacer par l'ajout d'un compte et envoie d'email 
      throw new FriendRelationException(messages.message.personalEmailNotAllowed);
    }

    if(!findFriend) {
      // Todo remplacer par l'ajout d'un compte et envoie d'email 
      throw new UserNotFindException(messages.message.emailNotFind);
    }

    // Vérification existance relation amis et ajout de la relation
    const isFriendRelationExist = await this.repositories.userFriendRepository.findOneFriendByUserId({
    userId: addFriend.userId!,
    friendId: findFriend.id!
   });

   if(isFriendRelationExist) {
    throw new FriendRelationException(messages.message.friendRelationAlreadyExist);
   }

    // Ajout ami user->ami et ami->user    
    const addFriendRelation = await this.repositories.userFriendRepository.addFriend(new AddFriendEntity({
      userId: addFriend.userId!,
      friendId: findFriend.id!,
      friendEmail: findFriend.email!,
      friendName: addFriend.friendName!
    }));
    return UserFriendMapper.getUserFriendsEntities(addFriendRelation);
  }
}