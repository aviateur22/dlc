import { ProductUserByUserModel } from "../../../infra/models/productUser/ProductUserByUserModel";
import { ProductUserModel } from "../../../infra/models/productUser/ProductUserModel";
import { AddProductUserEntity } from "../../entities/productUser/AddProductUserEntity";

export interface ProductUserRepositorySchema {

  /**
   * Ajout 
   * @param productUser 
   */
  save(productUser: Partial<AddProductUserEntity>): Promise<ProductUserModel>;

  /**
   * FindAll
   */
  findAll(): Promise<Array<ProductUserModel>>;

  /**
   * FindByUserId
   */
  findByUserId(userId: string): Promise<Array<ProductUserModel>>;

  /**
   * FindByUserAndProductId
   * @param {string} userId 
   * @param {string} productId 
   */
  findByUserIdAndProductId(userId: string, productId: string): Promise<Array<ProductUserModel>>;

  /**
   * DeleteAll
   */
  deleteAll(): Promise<void>;

  /**
   * DeleteBYProductId
   */
  deleteByProductId(productId: string): Promise<void>
}