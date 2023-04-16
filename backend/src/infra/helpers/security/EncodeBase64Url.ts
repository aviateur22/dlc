export class EncodeBase64Url {
  /**
   * Encode un string en base64
   * @param {string} string 
   * @returns {string} - chaine encodée en base64
   */
  static encodeStringToBase64Url(text: string): string {        
    const base64String = Buffer.from(text).toString("base64url");
    return base64String;
  }

  /**
   * decode une chaine base64 en string
   * @param {string} string 
   * @returns {string} chaine
   */
  static decodeBase64UrlToString(text: string): string {
    const decode = Buffer.from(text,"base64url").toString('utf-8');
    return decode;
  }
}