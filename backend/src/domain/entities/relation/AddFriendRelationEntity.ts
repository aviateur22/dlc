/**
 * Création FriendRelation Entity
 */
export class AddFriendRelationEntity { 
  readonly isActivated!: boolean;
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