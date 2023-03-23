import crypto from 'crypto';
import { EncodeBase64 } from '../EncodeBase64';

export class CryptoAES {

  private algorithm = 'aes-256-cbc';
  private bufferEncryption:any = 'base64';  
  private key: any = process.env.AES_KEY;
  private iv: any = process.env.AES_IV;  

  /**
   * chiffrement - suivi d'un encodage base64
   * @param {string} data - données a chiffrer
   * @returns {object}
   */
  async encrypt(data: string): Promise<string> {
  try {   
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
      const dataStringify = JSON.stringify({
          content: encrypted.toString(this.bufferEncryption)
      });
      /** encodage base64 */
      const dataEncode = EncodeBase64.encodeStringToBase64(dataStringify);
      return dataEncode;
  } catch (error){
      throw (error);
  }
  };

  /**
   * decodage base64 en UTF-8 suivi d'un déchiffrement
   * @param {object} data 
   * @returns {string} -
   */
  async decrypt(data: string): Promise<string> {
      try {    
          /** conversion base64 -> UTF8*/       
          let dataDecode: any = EncodeBase64.decodeBase64ToString(data);
    
          
          /** dechriffement données */
          dataDecode = JSON.parse(dataDecode);         
          if(!dataDecode?.content){
              throw {
                  aes: true,
                  errorMessage: 'bcrypt - invalid data.content'
              };
          }
          let encryptedText = Buffer.from(dataDecode.content, this.bufferEncryption);    
          let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key),this.iv);
          let decrypted = decipher.update(encryptedText);
          decrypted = Buffer.concat([decrypted, decipher.final()]);
          return decrypted.toString();
      } catch (err)
      {            
          throw {
              aes: true,
              errorMessage: err
          };
      }
  };
}