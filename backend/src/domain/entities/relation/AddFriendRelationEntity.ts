/**
 * Création FriendRelation Entity
 */
export class AddFriendRelationEntity { 
  readonly friendId!: string;
  readonly userId!: string;
  readonly isAccepted!: boolean;
  readonly isNew!: boolean;
  readonly updatedAt!: Date;
  readonly createdAt!: Date;

  constructor(acceptRelationData: Partial<AddFriendRelationEntity>) {
    let key: keyof typeof acceptRelationData;
    for(key in acceptRelationData) {
      //@ts-ignore
      this[key] = acceptRelationData[key];
    }

    const createdAt = new Date();
    this.updatedAt = createdAt;
    this.createdAt = createdAt;
  }
}