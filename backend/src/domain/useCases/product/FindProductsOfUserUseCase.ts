import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserMapper } from "../../dtos/UserMapper";
import { UserHomePageEntity } from "../../entities/user/UserHomePageEntity";
import { UseCaseModel } from "../UseCaseModel";

/**
 * ProductsUser Usecase
 */
export class FindProductsOfUserUseCase extends UseCaseModel {

  async execute(userId: string): Promise<UserHomePageEntity> {

    // Vérification existence user
    const findUser = await this.repositories.userRepository.findById(userId);

    if(!findUser) {
      throw new UserNotFindException('user does not exist')
    }

    // Recherche Product utilisateur
    const findUserProducts = await this.repositories.productRepository.findByUserId(userId);

    return UserMapper.getUserHomeEntity(userId, findUser.email, findUserProducts)
  }
}