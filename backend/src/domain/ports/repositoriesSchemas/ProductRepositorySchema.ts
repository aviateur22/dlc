import { ProductModel } from "../../../infra/models/ProductModel";
import { AddProductEntity } from "../../entities/product/AddProductEntity";
import { DeleteProductEntity } from "../../entities/product/DeleteProductEntity";
import { ProductEntity } from "../../entities/product/ProductEntity";

export interface ProductRepositorySchema {
  /**
   * Sauvegarde product
   * @param {Partial<AddProductEntity>} product 
   */
  save(product: Partial<AddProductEntity>): Promise<ProductModel>;

  /**
   * Find products by User
   * @param {string} userId
   */
   findByUserId(userId: string): Promise<Array<ProductModel>>;

   /**
    * FindProductById
    * @param {string} productId 
    */
   findById(productId: string): Promise<ProductModel|null>

   /**
    * DeleteByProductId
    * @param {DeleteProductEntity} product 
    */
   deleteById(product: DeleteProductEntity): Promise<ProductModel|null>

  /**
   * findAll products
   */
  findAll(): Promise<Array<ProductModel>>

  /**
   * Suppression 
   */
  deleteAll(): Promise<void>;
}