/**
 * FriendCommandeEntity
 */
export class AddFriendProductEntity {
  readonly userId!: string;
  readonly ownerId!: string;
  readonly productId!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(friendData: Partial<AddFriendProductEntity>){
    const createdAt = new Date();

    let key: keyof typeof friendData;
    for(key in friendData) { 
      // @ts-ignore
      this[key] = friendData[key]!
    }

    this.createdAt = createdAt;
    this.updatedAt = createdAt;    
  }
}