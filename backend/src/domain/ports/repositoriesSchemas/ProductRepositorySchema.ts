import { ProductModel } from "../../../infra/models/product/ProductModel";
import { ProductWithImageModel } from "../../../infra/models/product/ProductWithImageModel";
import { AddProductEntity } from "../../entities/product/AddProductEntity";
import { DeleteProductEntity } from "../../entities/product/DeleteProductEntity";
import { SearchProductEntity } from "../../entities/product/SearchProductEntity";

export interface ProductRepositorySchema {
  /**
   * Sauvegarde product
   * @param {Partial<AddProductEntity>} product 
   */
  save(product: Partial<AddProductEntity>): Promise<ProductModel|null>;

  /**
   * Find products by User
   * @param {string} userId
   */
  findByUserId(userId: string): Promise<Array<ProductWithImageModel>>;

  /**
   * FindProductById
   * @param {string} productId 
   */
  findById(searchProduct: SearchProductEntity): Promise<ProductModel|null>

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