export class ProductUserModel {
  id!: string;
  userId!: string;
  productId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(addProductUser: Partial<ProductUserModel>) {
    let key: keyof typeof addProductUser;
    for(key in addProductUser) { 
      // @ts-ignore
      this[key] = addProductUser[key]
    }
  }
}
