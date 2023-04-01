import { JwtInfomration } from "./JwtInfomration";
import jsonWebtoken  from 'jsonwebtoken';
import { ErrorServerException } from "../../../../exceptions/ErrorServerException";
import messages from "../../../../domain/messages/messages";
import { SessionExpiredException } from "../../../../exceptions/SessionExpiredException";

export class JwtHandler {  

  async generate(jwtInfomration: JwtInfomration) {
    //clé secrete
    const KEY = process.env.JWT_PRIVATE_KEY;

    if(!KEY){
      throw new ErrorServerException(messages.message.errorServer);      
    }

    // Génération JWT sans token */
    const jwt = jsonWebtoken.sign({                    
      data: jwtInfomration.data
    }, KEY, {
        algorithm: jwtInfomration.algorithm,
        issuer: jwtInfomration.issuer,
        subject: jwtInfomration.subject ,
        jwtid: jwtInfomration.jwtid,
        expiresIn: jwtInfomration.expiresIn
    });
    return jwt;
  }

  /**
   * Vérification JWT
   * @param jwtToVerifiy 
   * @returns any - payload du JWT
   */
  verify(jwtToVerifiy: string): any {
    
    //clé secrete
    const KEY = process.env.JWT_PRIVATE_KEY;  

    if(!KEY){
      throw new ErrorServerException(messages.message.errorServer);
    } 

    const payload = jsonWebtoken.verify(jwtToVerifiy, KEY, function(err: any, payload: any): any {        
      if(err){
        console.log(err.name)
        throw new SessionExpiredException(messages.message.expiredSession);
      }  
      return payload;
    });

    return payload;    
  }
}