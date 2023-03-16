import { AddProductEntity } from "../../../domain/entities/product/AddProductEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductModel } from "../../models/ProductModel";
/**
 * User repo PostgreSQL
 */
export class InMemoryProductRepository implements ProductRepositorySchema {
  

  private products: Array<ProductModel> = []

  /**
   * FindProduct by user
   * @param userId 
   */
  findByUserId(userId: string): Promise<ProductModel[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * FindAll product
   */
  async findAll(): Promise<Array<ProductModel>> {
     return this.products;
  } 

  /**
   * Ajout utilisateur
   * @param {AddUserEntity} user 
   * @returns {UserModel}
   */
  async save(product: AddProductEntity): Promise<ProductModel> {
    throw new Error('Method not implemented');
  }

  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
   throw new Error('Method not implemented');
  }
}