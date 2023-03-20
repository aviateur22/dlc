import { UserMapper } from "../../dtos/UserMapper";
import { FindUserEntity } from "../../entities/user/FindUserEntity";
import { UserEntity } from "../../entities/user/UserEntity";
import { UseCaseModel } from "../UseCaseModel";

export class FindUserUseCase extends UseCaseModel {

  /**
   * Recherche User par son id
   * @param {string} userId 
   * @returns {Promise<UserEntity|null>}
   */
  async execute(userId: string): Promise<UserEntity|null> {

    const user = await this.repositories.userRepository.findById(userId);

    if(!user) {
      return null
    }

    return UserMapper.getUserEntity(user);
  }
}
