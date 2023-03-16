import userMessages from "../../../exceptions/message/userMessages";
import { UserRegisterException } from "../../../exceptions/UserRegisterException";
import { UserValidationException } from "../../../exceptions/UserValidationException";
import { UserMapper } from "../../dtos/UserMapper";
import { AddUserEntity } from "../../entities/user/AddUserEntity"
import { UserEntity } from "../../entities/user/UserEntity";
import { Password } from "../../helpers/security/Password";
import { UseCaseModel } from "../UseCaseModel";
/**
 * Ajout d'un utilisateur
 */
export class RegisterUserUseCase extends UseCaseModel {

  /**
   * Ajout d'un utiliteur
   * @param {Partial<AddUserEntity>} object 
   */
  async execute(addUser: Partial<AddUserEntity>): Promise<UserEntity> {

    if(!addUser.email || !addUser.password) {
      throw new UserValidationException(userMessages.user.missing);
    }

    const findEmail = await this.repositories.userRepository.findByEmail({email: addUser.email});
    
    if(findEmail) {
      throw new UserRegisterException(userMessages.user.emailExist);
    }

    // Hash du mot de passe
    const hashPassword = await Password.hashPassword(addUser.password);

    const saveUser = await this.repositories.userRepository.save(new AddUserEntity(addUser.email, hashPassword));
    return UserMapper.userEntityMapper(saveUser);
  }
}