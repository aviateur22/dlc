/**
 * AddProductEntity
 */
export class AddProductUserEntity {
  userId!: string;
  productId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(addProductUser: Partial<AddProductUserEntity>) {
    let key: keyof typeof addProductUser;
    for(key in addProductUser) { 
      // @ts-ignore
      this[key] = addProductUser[key]
    }

    const createdAt = new Date();   
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }
}