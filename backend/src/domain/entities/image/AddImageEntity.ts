/**
 * AddImageEntity
 */
export class AddImageEntity {
  readonly imageBase64!: string;
  readonly mimType!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(addImage: Partial<AddImageEntity>) {
    let key: keyof typeof addImage;
    for(key in addImage) { 
      // @ts-ignore
      this[key] = addImage[key]
    }

    const createdAt = new Date();
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

}