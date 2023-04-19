/**
 * Accept FriendRelation Entity
 */
export class AcceptFriendRelationEntity {
  readonly relationId!: string;
  readonly isActivated!: boolean;
  readonly updatedAt!: Date;

  constructor(acceptRelationData: Partial<AcceptFriendRelationEntity>) {
    let key: keyof typeof acceptRelationData;
    for(key in acceptRelationData) {
      //@ts-ignore
      this[key] = acceptRelationData[key];
    }

    this.updatedAt = new Date();
  }
}