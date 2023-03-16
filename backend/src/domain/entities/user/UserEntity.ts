export class UserEntity {
  id!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: Partial<UserEntity>) {    
    let key: keyof typeof user;
    for(key in user) {  
      // @ts-ignore
      this[key] = user[key].toString()!
    }
  }
}