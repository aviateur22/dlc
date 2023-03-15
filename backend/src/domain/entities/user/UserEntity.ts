export class UserEntity {
  id!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: Partial<UserEntity>) {
    for(const key in Object.keys(user)) {
      // @ts-ignore
      this[key] = Object[key];
    }
  }
}