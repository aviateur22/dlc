/**
 * ProductModel
 */
export class ProductModel {
  readonly id!: string;
  readonly imageId!: string;
  readonly openDate!: Date;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(product: Partial<ProductModel>) {
    let key: keyof typeof product;
    for(key in product) { 
      // @ts-ignore
      this[key] = product[key]
    }
  }
}