import {v4 as uuidv4} from 'uuid';
import { CryptoAES } from '../aes/CryptoAES';
import { JwtInfomration } from '../jwt/JwtInfomration';
import { TokenJwt } from '../jwt/TokenJwt';
import jsonwebtoken from 'jsonwebtoken';
import { CookieToken } from '../../../ports/csurToken/CookieToken';
import { DecryptCookieToken } from './DecryptCookieCsurf';
import { ForbiddenException } from '../../../../exceptions/ForbiddenException';
import messages from '../../../../domain/messages/messages';
import { TokenSchema } from '../../../ports/csurToken/TokenSchema';

export class Token {

  /**
   * 
   * @returns {Promise<TokenSchema>}
   */
  static async generate(): Promise<TokenSchema> {        
    const aes = new CryptoAES();
    
    const uuid = uuidv4();

    // Chiffrement uuid
    const uuidEncrypt = await aes.encrypt(uuid);

    // Chiffrement secretWord
    const secret = await aes.encrypt(process.env.SECRET_APP_WORD!);

    // Chiffrement uuid+secret
    const cookieToken = await aes.encrypt(secret + '|' + uuid);

    return { cookieToken, payloadToken: uuidEncrypt };
  }

/**
 * comparaison du jeton sécurisé present dans req.body et dans le JWT
 * @param {string} cookieToken - contenant en payload les données a vérifier
 * @param {string} payloadToken - jeton chiffré contenantles données a vérifier 
 * @returns 
 */
static async compare(cookieToken: string, payloadToken: string) {
    
  const KEY = process.env.JWT_PRIVATE_KEY;

    if(!KEY){
      throw ({message: 'KEY token absente', statusCode:'500'});
    }   
    
    if(!payloadToken || !cookieToken){
      throw new ForbiddenException(messages.message.forbiddenAction);  
    }

    const aes = new CryptoAES();

    const cookieJwtDecrypt: CookieToken = await DecryptCookieToken.getDecryptToken(cookieToken);
      
    // SecretWord
    const secretWord = process.env.SECRET_APP_WORD;

    // PayloadToken decrypt             
    const tokenClientDecrypt =  await aes.decrypt(payloadToken);

    //comparaison du secret word et du token aéatoire
    if(cookieJwtDecrypt.secretAppWord !== secretWord || cookieJwtDecrypt.uuidToken !== tokenClientDecrypt){
      throw new ForbiddenException(messages.message.forbiddenAction);  
    }
    return true;    
  }
}