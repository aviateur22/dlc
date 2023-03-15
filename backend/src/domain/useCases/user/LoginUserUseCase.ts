import userMessages from "../../../exceptions/message/userMessages";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserValidationException } from "../../../exceptions/UserValidationException";
import { LoginUserEntity } from "../../entities/user/LoginUserEntity";
import { Password } from "../../helpers/security/Password";
import { UseCaseServiceImpl } from "../../services/UseCaseServiceImpl";
import { UseCaseModel } from "../UseCaseModel";
/**
 * Ajout d'un utilisateur
 */
export class LoginUserUseCase extends UseCaseModel {

  /**
   * Ajout d'un utiliteur
   * @param {Partial<AddUserEntity>} object 
   */
  async execute(loginUser: Partial<LoginUserEntity>): Promise<boolean> {

    if(!loginUser.email || !loginUser.password) {
      throw new UserValidationException(userMessages.user.missing);
    }

    const findUser = await this.repositories.userRepository.findByEmail({email: loginUser.email});
    if(!findUser) {
      throw new UserNotFindException('email or password unvalid');
    }

    // Hash du mot de passe
    const isPasswordValid = await Password.comparePassword(loginUser.password, findUser.password);
    
    return isPasswordValid;
  }
}