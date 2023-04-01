import { JwtSchema } from "../../../ports/jwt/JwtSchema";
import { JwtInfomration } from "./JwtInfomration";
import { JwtHandler } from "./JwtHandler";

export class GenerateJwtToken  {

  /**
   * Génération JWT
   * @param {JwtSchema} jwtSchema 
   * @returns {string}
   */
  static async getToken(jwtSchema: JwtSchema): Promise<string> {    
    const jwtInfomration = new JwtInfomration(jwtSchema);
    const jwt = await new JwtHandler().generate(jwtInfomration);
    return jwt;
  }
}