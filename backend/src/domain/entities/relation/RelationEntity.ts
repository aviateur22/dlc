/**
 * Entity FriendRelation
 */
export class RelationEntity {
  id!: string;
  friendId!: string;
  isAcceppted!: boolean;
  isNew!: boolean;
  friendEmail!: string;
  createdAt!: Date;
  updatedAt!: Date;


  constructor(relationEntity: Partial<RelationEntity>) {
    let key: keyof typeof relationEntity;
    for(key in relationEntity) {
      //@ts-ignore
      this[key] = relationEntity[key];
    }
  }
}