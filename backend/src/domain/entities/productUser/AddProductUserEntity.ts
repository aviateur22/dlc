/**
 * AddProductEntity
 */
export class AddProductUserEntity {
  readonly userId!: string;
  readonly productId!: string;
  readonly ownerId!: string
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

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