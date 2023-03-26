export class ProductUserModel {
  readonly id!: string;
  readonly userId!: string;
  readonly productId!: string;
  readonly ownerId!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(addProductUser: Partial<ProductUserModel>) {
    let key: keyof typeof addProductUser;
    for(key in addProductUser) { 
      // @ts-ignore
      this[key] = addProductUser[key]
    }
  }
}
