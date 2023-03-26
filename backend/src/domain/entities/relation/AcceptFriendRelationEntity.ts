/**
 * Accept FriendRelation Entity
 */
export class AcceptFriendRelationEntity {
  readonly relationId!: string;
  readonly isAccepted!: boolean;
  readonly isNew!: boolean;
  readonly updtedAt!: Date;

  constructor(acceptRelationData: Partial<AcceptFriendRelationEntity>) {
    let key: keyof typeof acceptRelationData;
    for(key in acceptRelationData) {
      //@ts-ignore
      this[key] = acceptRelationData[key];
    }

    this.updtedAt = new Date();
  }
}