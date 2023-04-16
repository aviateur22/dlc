/**
 * Model issu de la base de données
 */
export class RelationModel {
  readonly id!: string; 
  readonly isActivated!: boolean;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(relationData: Partial<RelationModel>) {
    let key: keyof typeof relationData;
    for(key in relationData) { 
      // @ts-ignore
      this[key] = relationData[key]
    }
  }

}