import { AddProductEntity } from "../../../domain/entities/product/AddProductEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductModel } from "../../models/ProductModel";
import client from "./connexion/databaseConnexion";

/**
 * User repo PostgreSQL
 */
export class PostgreSQLProductRepository implements ProductRepositorySchema {

  /**
   * FindAll product
   */
  async findAll(): Promise<Array<ProductModel>> {
    const users = await client.query('SELECT * FROM "user"');
    return users.rows;    
  } 

  /**
   * FindProduct by user
   * @param userId 
   */
  findByUserId(userId: string): Promise<ProductModel[]> {
    throw new Error("Method not implemented.");
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