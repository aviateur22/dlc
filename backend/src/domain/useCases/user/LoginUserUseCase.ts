import { LoginUserException } from "../../../exceptions/LoginUserException";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { ValidationException } from "../../../exceptions/ValidationException";
import messages from "../../messages/messages";
import { UserMapper } from "../../dtos/UserMapper";
import { LoginUserEntity } from "../../entities/user/LoginUserEntity";
import { UserEntity } from "../../entities/user/UserEntity";
import { Password } from "../../helpers/security/Password";
import { UseCaseModel } from "../UseCaseModel";
/**
 * Ajout d'un utilisateur
 */
export class LoginUserUseCase extends UseCaseModel {

  /**
   * Login user
   * @param {Partial<AddUserEntity>} loginUser 
   */
  async execute(loginUser: Partial<LoginUserEntity>): Promise<UserEntity> {

    if(!loginUser.email || !loginUser.password) {
      throw new ValidationException(messages.message.emailAndPasswordMandatory);
    }

    const findUser = await this.repositories.userRepository.findByEmail(loginUser.email);
    if(!findUser) {
      throw new LoginUserException(messages.message.emailOrPasswordFailed);
    }

    // Hash du mot de passe
    const isPasswordValid = await Password.comparePassword(loginUser.password, findUser.password);
    
    if(!isPasswordValid) {
      throw new LoginUserException(messages.message.emailOrPasswordFailed);
    }
    
    return UserMapper.getUserEntity(findUser);
  }
}