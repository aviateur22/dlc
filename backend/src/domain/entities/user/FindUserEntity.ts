export class FindUserEntity {
  email!: string;
  
  constructor(findUser: Partial<FindUserEntity>) {
    let key: keyof typeof findUser;
    for(key in findUser) { 
      // @ts-ignore
      this[key] = findUser[key]
    }
  }
}