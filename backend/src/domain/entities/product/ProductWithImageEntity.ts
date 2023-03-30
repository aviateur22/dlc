/**
 * ProductEntity with Image data
 */
export class ProductWithImageEntity {
  readonly id!: string;
  readonly openDate!: Date;
  readonly imageId!: string;  
  readonly userId!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(product: Partial<ProductWithImageEntity>) {
    let key: keyof typeof product;
    for(key in product) { 
      // @ts-ignore
      this[key] = product[key]
    }
  }
}