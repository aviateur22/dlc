/**
 * FriendModel
 */
export class UserFriendModel {
  readonly id!: string;
  readonly userId!: string;
  readonly friendId!: string;
  readonly friendName!: string;
  readonly friendEmail!: string;
  readonly relationAccepted!: boolean;
  readonly relationId!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(friendUser: Partial<UserFriendModel>) {
    let key: keyof typeof friendUser;
    for(key in friendUser) {
      // @ts-ignore
      this[key] = friendUser[key];
    }
  }

}