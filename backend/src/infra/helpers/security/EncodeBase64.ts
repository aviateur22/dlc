export class EncodeBase64 {
  /**
   * Encode un string en base64
   * @param {string} string 
   * @returns {string} - chaine encodée en base64
   */
  static encodeStringToBase64(text: string): string {        
    const base64String = Buffer.from(text).toString('base64');
    return base64String;
  }

  /**
   * decode une chaine base64 en string
   * @param {string} string 
   * @returns {string} chaine
   */
  static decodeBase64ToString(text: string): string {
    const decode = Buffer.from(text,'base64').toString('utf-8');
    return decode;
  }
}