import { ProductModel } from "../../../infra/models/ProductModel";
import { AddProductEntity } from "../../entities/product/AddProductEntity";

export interface ProductRepositorySchema {
  /**
   * Sauvegarde product
   * @param {Partial<AddProductEntity>} product 
   */
  save(product: Partial<AddProductEntity>): Promise<ProductModel>;

  /**
   * find products by User
   * @param {string} userId
   */
   findByUserId(userId: string): Promise<Array<ProductModel>>

  /**
   * findAll products
   */
  findAll(): Promise<Array<ProductModel>>

  /**
   * Suppression 
   */
  deleteAll(): Promise<void>;
}