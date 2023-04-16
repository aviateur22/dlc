import { UnvalidJwtException } from "../../../exceptions/UnvalidJwtException";
import { LogoutUserEntity } from "../../entities/user/LogoutUserEntity";
import messages from "../../messages/messages";

export class LogoutUserUseCase {
  /**
   * Stocke les données du JWT
   * @param {LogoutUserEntity} logoutData 
   */
  async execute(logoutData: LogoutUserEntity): Promise<boolean> {
    
   
    if(!logoutData.jwtIdentifier || !logoutData.JwtExpiredAt) {
      throw new UnvalidJwtException(messages.message.jwtUnvalidData);
    }
  
    const logoutDataEntity = new LogoutUserEntity(logoutData.jwtIdentifier, logoutData.JwtExpiredAt);
    
    // Todo Store JwtId and Iat to prevent Attack on JWT
    return true;
  }
}