/**
 * ProductModel with image
 */
export class ProductWithImageModel {
  readonly id!: string;
  readonly mimeType!: string;
  readonly imageBase64!: string;
  readonly openDate!: Date;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(product: Partial<ProductWithImageModel>) {
    let key: keyof typeof product;
    for(key in product) { 
      // @ts-ignore
      this[key] = product[key]
    }
  }
}