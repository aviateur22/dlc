import { ProductWithImageEntity } from "../product/ProductWithImageEntity";

export class UserHomePageEntity {
  userId!: string;
  userEmail!: string
  products!: Array<ProductWithImageEntity>;

  constructor(homePageData: Partial<UserHomePageEntity>) {
    let key: keyof typeof homePageData;
    for(key in homePageData) {  
      // @ts-ignore
      this[key] = homePageData[key]
    }
  }
}