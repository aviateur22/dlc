import messages from "../../../../domain/messages/messages";
import { ForbiddenException } from "../../../../exceptions/ForbiddenException";
import { CookieToken } from "../../../ports/csurToken/CookieToken";
import { CryptoAES } from "../aes/CryptoAES";

export class DecryptCookieToken {

  /**
   * 
   * @param token 
   * @returns 
   */
  static async getDecryptToken(token: string): Promise<CookieToken> {
    /** decryptage des token */
    const aes = new CryptoAES();    

    /** décodage base64 -> UTF-8 puis décryptage du token jwt.data.token - contient le code secret | token aléatoire (non chiffré)*/
    const jwtTokenDecrypt = await aes.decrypt(token);

    /**séparation du JWTtokenDecrypt avec le signe | */
    const jwtTokenArray = jwtTokenDecrypt.split('|');

    if(jwtTokenArray.length !== 2){ 
      throw new ForbiddenException(messages.message.forbiddenAction);                   
    }

    return {
      secretAppWord: await aes.decrypt(jwtTokenArray[0]),
      uuidToken: jwtTokenArray[1]
    }
  }
}