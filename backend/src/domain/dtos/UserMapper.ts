import { ProductModel } from "../../infra/models/product/ProductModel";
import { ProductWithImageModel } from "../../infra/models/product/ProductWithImageModel";
import { UserModel } from "../../infra/models/UserModel";
import { ProductWithImageEntity } from "../entities/product/ProductWithImageEntity";
import { UserEntity } from "../entities/user/UserEntity";
import { UserHomePageEntity } from "../entities/user/UserHomePageEntity";

export class UserMapper {
  
  /**
   * Mapp vers UserEntity
   * @param { UserModel } user 
   * @returns { UserEntity }
   */
  static getUserEntity(user: UserModel): UserEntity { 
    const id = user.id.toString();
    return new UserEntity({id, ...{ email: user.email, updatedAt: user.updatedAt, createdAt: user.createdAt }});
  }


  static getUserHomeEntity(userId: string, userEmail: string, products: Array<ProductWithImageModel>) {
    // Productentity
    const productsWithImageEntity = products.map(product=>{
      return new ProductWithImageEntity(product);
    })
    return new UserHomePageEntity({ userId, userEmail, products: productsWithImageEntity})
    
  }
}