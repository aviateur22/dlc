import { ProductUserByUserModel } from "../../../infra/models/productUser/ProductUserByUserModel";
import { ProductUserModel } from "../../../infra/models/productUser/ProductUserModel";
import { AddProductUserEntity } from "../../entities/productUser/AddProductUserEntity";

export interface ProductUserRepositorySchema {

  /**
   * Ajout 
   * @param productUser 
   */
  save(productUser: Partial<AddProductUserEntity>): Promise<ProductUserModel|null>;

  /**
   * FindAll
   */
  findAll(): Promise<Array<ProductUserModel>>;

  /**
   * FindByUserId
   */
  findByUserId(userId: string): Promise<Array<ProductUserModel>>;

  /**
   * Recherche ProductUser par user et owner
   * @param {string} userId 
   * @param {string} ownerId
   * @returns {Promise<Array<ProductUserModel>>} 
   */
  findByUserIdAndOwnerId(userId: string, ownerId: string): Promise<Array<ProductUserModel>>;

  /**
   * FindByUserAndProductId
   * @param {string} userId 
   * @param {string} productId 
   */
  findByUserIdAndProductId(userId: string, productId: string): Promise<Array<ProductUserModel>>;

  /**
   * Suppression de plusieurs relations produit-utilisateur
   * @param {Array<string>} productIdArray
   * @param {string} userId
   */
  deleteMultipleProductsByUserId(productIdArray: Array<string>, userId: string): Promise<void>;

  /**
   * Supprssion de plusieurs relation produit-utilisateur
   * @param {string} productId 
   * @param {Array<string>} userIdArray
   */
  deleteOneProductForMultipleUsers(productId: string, userIdArray: Array<string>): Promise<void>;

  /**
   * DeleteAll
   */
  deleteAll(): Promise<void>;

  /**
   * DeleteBYProductId
   */
  deleteByProductId(productId: string): Promise<void>
}