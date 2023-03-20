import { JwtInfomration } from "./JwtData";
import { jsonWebtoken } from 'jsonwebtoken';

export class TokenJwt {    
  constructor(private jwtInfomration: JwtInfomration){

  }

  async jwtWithoutToken() {
    //clé secrete
    const KEY = process.env.JWT_PRIVATE_KEY;

    if(!KEY){
      throw new Error('invalid jwt generation');      
    }

    // Génération JWT sans token */
    const jwt = jsonWebtoken.sign({                    
      data: this.jwtInfomration.data
    }, KEY, {
        algorithm: this.jwtInfomration.algorithm,
        issuer: this.jwtInfomration.issuer,
        subject: this.jwtInfomration.subject ,
        jwtid: this.jwtInfomration.jwtid,
        expiresIn: this.jwtInfomration.expiresIn
    });
    return jwt;
  }
}