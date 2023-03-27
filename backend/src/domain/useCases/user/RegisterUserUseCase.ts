import { EmailFindException } from "../../../exceptions/EmailFindException";
import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { UserValidationException } from "../../../exceptions/UserValidationException";
import messages from "../../messages/messages";
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
   * @param {Partial<AddUserEntity>} addUser 
   */
  async execute(addUser: Partial<AddUserEntity>): Promise<UserEntity> {

    const findEmail = await this.repositories.userRepository.findByEmail(addUser!.email!);
    
    if(findEmail) {
      throw new EmailFindException(messages.message.emailExist);
    }

    // Hash du mot de passe
    const hashPassword = await Password.hashPassword(addUser.password!);

    const saveUser = await this.repositories.userRepository.save(new AddUserEntity(addUser!.email!, hashPassword));
    
    if(!saveUser) {
      throw new ErrorDatabaseException(messages.message.errorServer);
    }

    return UserMapper.getUserEntity(saveUser);
  }
}