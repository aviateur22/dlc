import { UserMapper } from "../../dtos/UserMapper";
import { FindUserEntity } from "../../entities/user/FindUserEntity";
import { UserEntity } from "../../entities/user/UserEntity";
import { UseCaseModel } from "../UseCaseModel";

export class FindUserUseCase extends UseCaseModel {
  async execute(findUser: Partial<FindUserEntity>): Promise<UserEntity|null> {

    const user = await this.repositories.userRepository.findByEmail(findUser);

    if(!user) {
      return null
    }

    return UserMapper.userEntityMapper(user);
  }
}