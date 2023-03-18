export class DeleteProductEntity {

  userId!: string;
  productId!: string;

  constructor(product: Partial<DeleteProductEntity>) {
    let key: keyof typeof product;
    for(key in product) { 
      // @ts-ignore
      this[key] = product[key]
    }
  }
}