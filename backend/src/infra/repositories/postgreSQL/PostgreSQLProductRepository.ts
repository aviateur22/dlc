import { DeleteProductEntity } from "../../../domain/entities/product/DeleteProductEntity";
import { ProductEntity } from "../../../domain/entities/product/ProductEntity";
import { ProductImageEntity } from "../../../domain/entities/product/ProductImageEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductModel } from "../../models/ProductModel";
import client from "./connexion/databaseConnexion";

/**
 * User repo PostgreSQL
 */
export class PostgreSQLProductRepository implements ProductRepositorySchema {
  /**
   * FindAll product
   * @returns {Array<ProductModel>}
   */
  async findAll(): Promise<Array<ProductModel>> {
    const products = await client.query('SELECT * FROM "product"');
    return products.rows;   
  } 

  /**
   * FindProduct by user
   * @param userId 
   */
  findByUserId(userId: string): Promise<ProductModel[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * FindProductById
   * @param {string} productId 
   */
  async findById(productId: string): Promise<ProductModel|null> {
    const findProduct = await client.query('SELECT * FROM "product" WHERE "id"=$1', [ 
      productId
    ]);

    return findProduct.rowCount > 0 ? findProduct.rows.shift() : null;
  }
  
  /**
   * Ajout utilisateur
   * @param {AddUserEntity} user 
   * @returns {UserModel}
   */
  async save(product: ProductImageEntity): Promise<ProductModel> {
    const addProduct = await client.query('INSERT INTO "product" ("imageId", "openDate", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) returning *', [ 
      product.imageId, product.openDate, product.createdAt, product.updatedAt
    ]);

    return addProduct.rows.shift();
  }

  /**
   * DeleteByProductId
   * @param {DeleteProductEntity} product 
   * @returns {Promise<ProductEntity>}
   */
  async deleteById(product: DeleteProductEntity): Promise<ProductModel|null> {
    const deleteProduct = await client.query('DELETE FROM "product" WHERE id = $1 returning *',[
      product.productId
    ]);
    return deleteProduct.rowCount > 0 ? deleteProduct.rows.shift() : null;
  }

  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "product" RESTART IDENTITY CASCADE');
  }
}