import { AddProductUserEntity } from "../../../domain/entities/productUser/AddProductUserEntity";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
import { ProductUserByUserModel } from "../../models/productUser/ProductUserByUserModel";
import { ProductUserModel } from "../../models/productUser/ProductUserModel";
import client from "./connexion/databaseConnexion";

export class PostgreSQLProductUserRepository implements ProductUserRepositorySchema {
 
  /**
   * Save
   * @param {Partial<AddProductUserEntity>} productUser 
   */
  async save(productUser: Partial<AddProductUserEntity>): Promise<ProductUserModel> {

    const addProductUser = await client.query('INSERT INTO "product_user" ("userId", "productId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) returning *', [ 
      productUser.userId, productUser.productId, productUser.createdAt, productUser.updatedAt
    ]);

    return addProductUser.rows.shift();
  }

  /**
   * FindByUserId
   * @param {string} userId 
   */
  findByUserId(userId: string): Promise<ProductUserByUserModel> {
    throw new Error("Method not implemented.");
  }

  /**
   * FindByUserIDProductId
   * @param {string} userId 
   * @param {string} productId 
   */
  async findByUserIdAndProductId(userId: string, productId: string): Promise<Array<ProductUserModel>> {
    const products = await client.query('SELECT * FROM "product_user" WHERE "userId"=$1 AND "productId"=$2 LIMIT 1', [
      userId, productId
    ]);
    return products.rows;
  }

  /**
   * FindAll
   * @returns {Promise<ProductUserModel[]>}
   */
  async findAll(): Promise<ProductUserModel[]> {
    const products = await client.query('SELECT * FROM "product_user"');
    return products.rows;
  }

  /**
   * DeleteAll
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "product_user" RESTART IDENTITY CASCADE');
  }

  deleteByProductId(productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
 
  
}