export class FindUserEntity {
  email!: string;
  
  constructor(findUser: Partial<FindUserEntity>) {
    for(const key of Object.keys(findUser)) {
      // @ts-ignore
      this[key] = object[key]
    }
  }
}