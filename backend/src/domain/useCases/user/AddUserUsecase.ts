import userMessages from "../../../exceptions/message/userMessages";
import { UserValidationException } from "../../../exceptions/UserValidationException";
import { AddUserEntity } from "../../entities/user/AddUserEntity"
import { UseCaseModel } from "../useCaseModel";
/**
 * Ajout d'un utilisateur
 */
export class AddUserUsecase extends UseCaseModel {

  /**
   * Ajout d'un utiliteur
   * @param {Partial<AddUserEntity>} object 
   */
  execute(addUser: Partial<AddUserEntity>){

    if(!addUser.email || !addUser.password) {
      throw new UserValidationException(userMessages.user.missing);
    }

    const user = new AddUserEntity(addUser.email, addUser.password);

    this.repositories.userRepository.save(user);
  }
}