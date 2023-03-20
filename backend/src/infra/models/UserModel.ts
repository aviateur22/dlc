/**
 * Model issu de la base de données
 */
export class UserModel {
  readonly id!: string;
  readonly email!: string;
  readonly password!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(user: Partial<UserModel>) {
    let key: keyof typeof user;
    for(key in user) { 
      // @ts-ignore
      this[key] = user[key]
    }
  }

}