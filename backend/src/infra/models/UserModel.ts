/**
 * Model issu de la base de données
 */
export class UserModel {
  readonly id: string;
  readonly email!: string;
  readonly password!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(
    id: string, 
    email: string, 
    password: string, 
    updatedAt: Date,
    createdAt: Date
    ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}