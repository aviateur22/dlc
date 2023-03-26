import { AddProductUserEntity } from "../../../domain/entities/productUser/AddProductUserEntity";
import { ProductUserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductUserRepositorySchema";
import { ProductUserModelMapper } from "../../dto/ProductUserModelMapper";
import { ProductUserModel } from "../../models/productUser/ProductUserModel";
import client from "./connexion/databaseConnexion";

export class PostgreSQLProductUserRepository implements ProductUserRepositorySchema {
 
  /**
   * Save
   * @param {Partial<AddProductUserEntity>} productUser 
   */
  async save(productUser: Partial<AddProductUserEntity>): Promise<ProductUserModel|null> {

    const addProductUser = await client.query('INSERT INTO "product_user" ("user_id", "product_id", "owner_id", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5) returning *', [ 
      productUser.userId, productUser.productId, productUser.ownerId, productUser.createdAt, productUser.updatedAt
    ]).then(result=>{
      
      // Erreur save
      if(result.rowCount === 0) {
        return null;
      }

      return ProductUserModelMapper.getProductUserModel(result.rows.shift());
    });

    return addProductUser;
  }

  /**
   * FindByUserId
   * @param {string} userId
   * @returns {Promise<Array<ProductUserModel>>}
   */
  async findByUserId(userId: string): Promise<Array<ProductUserModel>> {
    const productUserByUserId = await client.query('SELECT * FROM "product_user" WHERE "user_id"=$1',[
      userId
    ]).then(result => {
      return ProductUserModelMapper.getProductsUsersModel(result.rows);
    });

    return productUserByUserId;
  }

  /**
   * FindByUserIDProductId
   * @param {string} userId 
   * @param {string} productId 
   */
  async findByUserIdAndProductId(userId: string, productId: string): Promise<Array<ProductUserModel>> {
    const products = await client.query('SELECT * FROM "product_user" WHERE "user_id"=$1 AND "product_id"=$2 LIMIT 1', [
      userId, productId
    ]).then(result => {
      return ProductUserModelMapper.getProductsUsersModel(result.rows);
    });
    return products;
  }

  /**
   * FindAll
   * @returns {Promise<ProductUserModel[]>}
   */
  async findAll(): Promise<Array<ProductUserModel>> {
    const products = await client.query('SELECT * FROM "product_user"').then(result => {
      return ProductUserModelMapper.getProductsUsersModel(result.rows);
    });
    return products;
  }

   /**
   * Suppression de plusieurs relations produit-utilisateur
   * @param {Array<string>} productIdArray
   * @param {string} userId
   */
  async deleteMultipleProductsByUserId(productIdArray: string[], userId: string): Promise<void> {
    await client.query(`WITH delete_product_user AS(
      DELETE FROM "product_user" WHERE product_user.product_id=ANY($1) AND "user_id" =$2 RETURNING *)
      SELECT * FROM delete_product_user
      JOIN "user" ON "delete_product_user".user_id = "user".id
      `, [
      productIdArray, userId
    ]);
  }

  /**
   * Supprssion de plusieurs relation produit-utilisateur
   * @param {string} productId 
   * @param {Array<string>} userIdArray
   */
  async deleteOneProductForMultipleUsers(productId: string, userIdArray: string[]): Promise<void> {
    await client.query('DELETE FROM "product_user" WHERE "product_id"=$1 AND product_user.user_id=ANY($2)', [
      productId, userIdArray
    ]);
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