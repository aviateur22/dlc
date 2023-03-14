/**
 * Nouvel utiliateur
 */
export class AddUserEntity {
  readonly email!: string ;
  readonly password!: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}