import { JwtSchema } from "../../../ports/jwt/JwtSchema";
import { JwtInfomration } from "./JwtInfomration";
import { TokenJwt } from "./TokenJwt";

export class GenerateJwtToken  {

  /**
   * 
   * @param {JwtSchema} jwtSchema 
   * @returns {string}
   */
  static async getToken(jwtSchema: JwtSchema): Promise<string> {    
    const jwtInfomration = new JwtInfomration(jwtSchema);
    const tokenJwt = await new TokenJwt(jwtInfomration).jwtWithoutToken();
    return tokenJwt;
  }  

}