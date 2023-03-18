/**
 * SearchProductEntity
 */
export class SearchProductEntity {
  userId!: string;
  productId!: string;

  constructor(searchProduct: Partial<SearchProductEntity>) {
    let key: keyof typeof searchProduct;
    for(key in searchProduct) { 
      // @ts-ignore
      this[key] = searchProduct[key]
    }
  }
}