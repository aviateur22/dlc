export class AddProductEntity {
  readonly imageBase64!: string;
  readonly mimeType!: string;
  readonly userId!: string;
  readonly openDate!: Date;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
// imageBase64: string, user: UserEntity, openDate: Date
  constructor(addProduct: Partial<AddProductEntity>) {    
    let key: keyof typeof addProduct;
    for(key in addProduct) { 
      // @ts-ignore
      this[key] = addProduct[key]
    }

    const createdAt = new Date();   
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

}