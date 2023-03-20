export class LoginUserEntity {
  email!: string;
  password!: string;

  constructor(loginUser : Partial<LoginUserEntity>) {
    let key: keyof typeof loginUser;
    for(key in loginUser) { 
      // @ts-ignore
      this[key] = loginUser[key]
    }
  }
}