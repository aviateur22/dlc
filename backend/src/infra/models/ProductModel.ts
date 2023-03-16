/**
 * ProductModel
 */
export class ProductModel {
  readonly id!: string;
  readonly userId!: string;
  readonly imageId!: string
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