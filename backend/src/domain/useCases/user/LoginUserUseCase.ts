import { LoginUserException } from "../../../exceptions/LoginUserException";
import { LoginUserEntity } from "../../entities/user/LoginUserEntity";
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
  async execute(loginUser: Partial<LoginUserEntity>): Promise<boolean> {

    if(!loginUser.email || !loginUser.password) {
      throw new LoginUserException('email or password unvalid');
    }

    const findUser = await this.repositories.userRepository.findByEmail(loginUser.email);
    if(!findUser) {
      throw new LoginUserException('email or password unvalid');
    }

    // Hash du mot de passe
    const isPasswordValid = await Password.comparePassword(loginUser.password, findUser.password);
    
    if(!isPasswordValid) {
      throw new LoginUserException('email or password unvalid');
    }
    
    return isPasswordValid;
  }
}