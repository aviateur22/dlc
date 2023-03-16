/**
 * Nouvel utiliateur
 */
export class AddUserEntity {
  readonly email!: string ;
  readonly password!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(email: string, password: string) {
    const createdAt = new Date();
    this.email = email;
    this.password = password;
    // Mise a jour date
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }
}