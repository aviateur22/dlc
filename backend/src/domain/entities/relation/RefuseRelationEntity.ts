/**
 * Entity RefuseRelation
 */
export class RefuseRelationEntity {
  friendId!: string;
  relationId!: string;

  constructor(refuseRelationData: Partial<RefuseRelationEntity>){
    let key: keyof typeof refuseRelationData;

    for(key in refuseRelationData) {
      //@ts-ignore
      this[key] = refuseRelationData[key];
    }
  }
}