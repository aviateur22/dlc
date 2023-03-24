import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { UserFriendMapper } from "../../dtos/UserFriendMapper";
import { AddFriendEntity } from "../../entities/friend/AddFriendEntity";
import { UserFriendEntity } from "../../entities/friend/UserFriendEntity";
import { UseCaseModel } from "../UseCaseModel";
import { Friends } from "../utils/Friends";

/**
 * AddFriendUsecase
 */
export class AddFriendUseCase extends UseCaseModel {

  async execute(addFriend: Partial<AddFriendEntity>): Promise<UserFriendEntity> {

    // Recherche existance email
    const findFriend = await this.repositories.userRepository.findByEmail(addFriend.friendEmail!);
  
    if(!findFriend) {
      // Todo remplacer par l'ajout d'un compte et envoie d'email 
      throw new UserNotFindException('email pas existant');
    }

    // Ajout des produits utilisateur à l'ami
    await Friends.addAllProductsToOneFriend(addFriend.userId!, findFriend.id);

    const friend = await this.repositories.userFriendRepository.addFriend(new AddFriendEntity({
      userId: addFriend.userId!,
      friendId: findFriend.id!,
      friendEmail: findFriend.email!,
      friendName: addFriend.friendName!,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return UserFriendMapper.getUserFriendEntity(friend);
  }
}