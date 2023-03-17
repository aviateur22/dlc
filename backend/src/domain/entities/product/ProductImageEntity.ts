/**
 * ProductImageEntity
 */
export class ProductImageEntity {
  readonly imageId!: string;
  readonly openDate!: Date;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
// imageBase64: string, user: UserEntity, openDate: Date
  constructor(productImage: Partial<ProductImageEntity>) {    
    let key: keyof typeof productImage;
    for(key in productImage) { 
      // @ts-ignore
      this[key] = productImage[key]
    }

    const createdAt = new Date();   
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }
}