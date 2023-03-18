import { DeleteProductEntity } from "../../../domain/entities/product/DeleteProductEntity";
import { ProductImageEntity } from "../../../domain/entities/product/ProductImageEntity";
import { SearchProductEntity } from "../../../domain/entities/product/SearchProductEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductModel } from "../../models/product/ProductModel";
import { ProductWithImageModel } from "../../models/product/ProductWithImageModel";
import { RepositoryServiceImpl } from "../../services/repository/RepositoryServiceImpl";
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
  async findByUserId(userId: string): Promise<ProductWithImageModel[]> {

    // Récupération des ProductId appartenant à l'utilisateur
    const productUserByUserIdList = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(userId);
    const productUserIdList = productUserByUserIdList.map(item=>item.productId);

    const products = await client.query(`
    SELECT * FROM "product"   
    JOIN "image" ON product.image_id = image.id
    WHERE product.id = ANY($1)`, [
     productUserIdList
    ]);
    
    return products.rows;

  }

  /**
   * FindProductById
   * @param {string} productId 
   */
  async findById(searchProduct: SearchProductEntity): Promise<ProductModel|null> {
    const findProduct = await client.query('SELECT * FROM "product" WHERE "id"=$1', [ 
      searchProduct.productId
    ]);

    return findProduct.rowCount > 0 ? findProduct.rows.shift() : null;
  }
  
  /**
   * Ajout utilisateur
   * @param {AddUserEntity} user 
   * @returns {UserModel}
   */
  async save(product: ProductImageEntity): Promise<ProductModel> {
    const addProduct = await client.query('INSERT INTO "product" ("image_id", "open_date", "created_at", "updated_at") VALUES ($1, $2, $3, $4) returning *', [ 
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