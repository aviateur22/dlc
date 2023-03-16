import { AddProductUserEntity } from "../../../domain/entities/productUser/AddProductUserEntity";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
import { ProductUserByUserModel } from "../../models/productUser/ProductUserByUserModel";
import { ProductUserModel } from "../../models/productUser/ProductUserModel";

export class InMemoryProductUserRepository implements ProductUserRepositorySchema {
  /**
   * Save
   * @param {Partial<AddProductUserEntity>} productUser 
   */
  async save(productUser: Partial<AddProductUserEntity>): Promise<ProductUserModel> {
    throw new Error("Method not implemented.");
  }

  /**
   * findAll
   */
  async findAll(): Promise<ProductUserModel[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * FindyUserId
   * @param {number} userId 
   */
  async findByUserId(userId: number): Promise<ProductUserByUserModel> {
    throw new Error("Method not implemented.");
  }

  /**
   * DeleteAll
   */
  async deleteAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}