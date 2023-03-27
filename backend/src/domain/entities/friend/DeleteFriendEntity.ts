/**
 * DeleteFriendEntity
 */
export class DeleteFriendEntity {
  userId!: string;
  friendId!:  string;

  constructor(deleteFriend: Partial<DeleteFriendEntity>){
    let key: keyof typeof deleteFriend;
    for(key in deleteFriend) {
      //@ts-ignore
      this[key] = deleteFriend[key];
    }
  }
}