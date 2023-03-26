/**
 * Création FriendRelation Entity
 */
export class AddFriendRelationEntity { 
  readonly friendId!: string 
  readonly isAccepted!: boolean;
  readonly isNew!: boolean;
  readonly updtedAt!: Date;
  readonly createdAt!: Date;

  constructor(acceptRelationData: Partial<AddFriendRelationEntity>) {
    let key: keyof typeof acceptRelationData;
    for(key in acceptRelationData) {
      //@ts-ignore
      this[key] = acceptRelationData[key];
    }

    const createdAt = new Date();
    this.updtedAt = createdAt;
    this.createdAt = createdAt;
  }
}