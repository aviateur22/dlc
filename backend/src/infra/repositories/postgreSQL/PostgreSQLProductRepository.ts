import { DeleteProductEntity } from "../../../domain/entities/product/DeleteProductEntity";
import { ProductImageEntity } from "../../../domain/entities/product/ProductImageEntity";
import { SearchProductEntity } from "../../../domain/entities/product/SearchProductEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductModelMapper } from "../../dto/ProductModelMapper";
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
    const products = await client.query('SELECT * FROM "product"').then(result=>{
      return ProductModelMapper.getProductsModel(result.rows);
    });
    return products;   
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
    ]).then(result=>{
      return ProductModelMapper.getProductWithImageModel(result.rows);
    })
    
    return products;

  }

  /**
   * FindProductById
   * @param {string} productId 
   */
  async findById(searchProduct: SearchProductEntity): Promise<ProductModel|null> {
    const findProduct = await client.query('SELECT * FROM "product" WHERE "id"=$1', [ 
      searchProduct.productId
    ]).then(result=>{
      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }

      return ProductModelMapper.getProductModel(result.rows.shift());
    });

    return findProduct;
  }
  
  /**
   * Ajout utilisateur
   * @param {AddUserEntity} user 
   * @returns {UserModel}
   */
  async save(product: ProductImageEntity): Promise<ProductModel|null> {
    const addProduct = await client.query('INSERT INTO "product" ("image_id", "open_date", "created_at", "updated_at") VALUES ($1, $2, $3, $4) returning *', [ 
      product.imageId, product.openDate, product.createdAt, product.updatedAt
    ]).then(result=>{
      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }

      return ProductModelMapper.getProductModel(result.rows.shift());
    });

    return addProduct;
  }

  /**
   * DeleteByProductId
   * @param {DeleteProductEntity} product 
   * @returns {Promise<ProductEntity>}
   */
  async deleteById(product: DeleteProductEntity): Promise<ProductModel|null> {
    const deleteProduct = await client.query('DELETE FROM "product" WHERE id = $1 returning *',[
      product.productId
    ]).then(result=>{
      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }

      return ProductModelMapper.getProductModel(result.rows.shift());
    });
    return deleteProduct;
  }

  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "product" RESTART IDENTITY CASCADE');
  }
}