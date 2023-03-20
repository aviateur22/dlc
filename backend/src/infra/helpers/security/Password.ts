import bcrypt from 'bcrypt';

export class Password {

  /**
   * Hash du password
   * @param {Password} password 
   * @returns {string}
   */
  static async hashPassword(password: string): Promise<string> {
    const passwordHash =await bcrypt.hash(password,10);
    return passwordHash;
  }

  /**
   * comparaison mot de passe
   * @param  {string} password 
   * @param {string} hashPassword
   * @returns {boolean} 
   */
  static async comparePassword(password: string, hashPassword:  string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}