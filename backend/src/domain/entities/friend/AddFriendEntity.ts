/**
 * Entity Ajout d'un ami
 */
export class AddFriendEntity {

  friendEmail!: string;
  friendName!: string;
  userId!: string;
  friendId!: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(addFriend: Partial<AddFriendEntity>) {
    
    let key: keyof typeof addFriend;
    const createdAt = new Date();
    
    for(key in addFriend) {  
      // @ts-ignore
      this[key] = addFriend[key].toString()!
    }
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }
}