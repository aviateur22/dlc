import { AddProductUserEntity } from "../../../domain/entities/productUser/AddProductUserEntity";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
import { ProductUserByUserModel } from "../../models/productUser/ProductUserByUserModel";
import { ProductUserModel } from "../../models/productUser/ProductUserModel";

export class PostgreSQLProductUserRepository implements ProductUserRepositorySchema {
 
  /**
   * Save
   * @param {Partial<AddProductUserEntity>} productUser 
   */
  save(productUser: Partial<AddProductUserEntity>): Promise<ProductUserModel> {
    throw new Error("Method not implemented.");
  }

  /**
   * FindByUserId
   * @param {number} userId 
   */
  findByUserId(userId: number): Promise<ProductUserByUserModel> {
    throw new Error("Method not implemented.");
  }

  /**
   * FindAll
   */
  findAll(): Promise<ProductUserModel[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * DeleteAll
   */
  deleteAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}