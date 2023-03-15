/**
 * Nouvel utiliateur
 */
export class AddUserEntity {
  readonly email!: string ;
  readonly password!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(email: string, password: string) {
    const createdAt: Date = new Date();

    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = createdAt
  }
}