import { AddProductEntity } from "../../../domain/entities/product/AddProductEntity";
import { ProductImageEntity } from "../../../domain/entities/product/ProductImageEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { Repositories } from "../../helpers/repositories/Repositories";
import { ProductModel } from "../../models/ProductModel";
import { RepositoryServiceImpl } from "../../services/repository/RepositoryServiceImpl";
import client from "./connexion/databaseConnexion";

/**
 * User repo PostgreSQL
 */
export class PostgreSQLProductRepository implements ProductRepositorySchema {

  // Acces au repo
  private repositories: Repositories = RepositoryServiceImpl.getRepository();

  /**
   * FindAll product
   */
  async findAll(): Promise<Array<ProductModel>> {
    throw new Error("Method not implemented.");   
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
  async save(product: ProductImageEntity): Promise<ProductModel> {

    const addProduct = await client.query('INSERT INTO "product" ("imageId", "openDate", "createdAt", updatedAt") VALUE($1, $2, $3, $4) returuning *', [ 
      product.imageId, product.openDate, product.createdAt, product.updatedAt
    ]);

    return addProduct.rows.shift();
  }

  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
   throw new Error('Method not implemented');
  }
}