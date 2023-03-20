export class ProductUserEntity {
  id!: string;
  userId!: string;
  productId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(addProductUser: Partial<ProductUserEntity>) {
    let key: keyof typeof addProductUser;
    for(key in addProductUser) { 
      // @ts-ignore
      this[key] = addProductUser[key]
    }
  }
}