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
  findByUserId(userId: number): Promise<ProductUserByUserModel>;

  /**
   * DeleteAll
   */
  deleteAll(): Promise<void>
}