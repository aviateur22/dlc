export class ProductEntity {
  readonly id!: string;
  readonly openDate!: Date;
  readonly imageId!: string;  
  readonly userId!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  constructor(product: Partial<ProductEntity>) {
    let key: keyof typeof product;
    for(key in product) { 
      // @ts-ignore
      this[key] = product[key]
    }
  }
}