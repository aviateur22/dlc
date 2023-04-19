import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserMapper } from "../../dtos/UserMapper";
import { UserHomePageEntity } from "../../entities/user/UserHomePageEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";

/**
 * ProductsUser Usecase
 */
export class FindProductsOfUserUseCase extends UseCaseModel {

  async execute(userId: string): Promise<UserHomePageEntity> {

    // Vérification existence user
    const findUser = await this.repositories.userRepository.findById(userId);

    if(!findUser) {
      throw new UserNotFindException(messages.message.userNotFind)
    }

    // Recherche Product utilisateur
    const findUserProducts = await this.repositories.productRepository.findByUserId(userId);

    return UserMapper.getUserHomeEntity(userId, findUser.email, findUserProducts)
  }
}