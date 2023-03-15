export class LoginUserEntity {
  email!: string;
  password!: string;

  constructor(loginUser : Partial<LoginUserEntity>) {
    for(const key of Object.keys(loginUser)) {
      // @ts-ignore
      this[key] = object[key]
    }
  }
}