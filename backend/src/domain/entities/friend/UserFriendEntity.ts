/**
 * UserFriendEntity
 */
export class UserFriendEntity {
  readonly id!: string;
  readonly userId!: string;
  readonly friendId!: string;
  readonly friendName!: string;
  readonly friendEmail!: string;
  readonly relationId! : string;
  readonly relationAccepted!: boolean;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(userFriend: Partial<UserFriendEntity>) {
    let key: keyof typeof userFriend;        
    for(key in userFriend) {  
      // @ts-ignore
      this[key] = userFriend[key].toString()!
    }
  }
}