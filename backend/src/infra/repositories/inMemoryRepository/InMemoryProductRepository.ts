import { AddProductEntity } from "../../../domain/entities/product/AddProductEntity";
import { DeleteProductEntity } from "../../../domain/entities/product/DeleteProductEntity";
import { ProductImageEntity } from "../../../domain/entities/product/ProductImageEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductModel } from "../../models/ProductModel";
import { RepositoryServiceImpl } from "../../services/repository/RepositoryServiceImpl";
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
   * FindProductById
   * @param {string} productId 
   */
  async findById(productId: string): Promise<ProductModel|null> {
    const findProduct = this.products.find(product=>(product.id === productId)); 

    if(typeof findProduct === 'undefined') {
      return null;
    }

    return findProduct;
  }

  /**
   * FindAll product
   */
  async findAll(): Promise<Array<ProductModel>> {
     return this.products;
  } 

  /**
   * Ajout utilisateur
   * @param {ProductImageEntity} product 
   * @returns {ProductModel}
   */
  async save(product: ProductImageEntity): Promise<ProductModel> {
    // Index
    const index: number = this.products.length === 0 ? 1 : Math.max(...this.products.map(x=>Number(x.id))) + 1;

    this.products.push({id: index.toString(), ...product});

    return { id: index.toString(), ...product };
  }

  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
   this.products = [];
  }

  /**
   * DeleteByProductId
   * @param {DeleteProductEntity} deleteProduct 
   * @returns {Promise<ProductModel|null>}
   */
  async deleteById(deleteProduct: DeleteProductEntity): Promise<ProductModel|null> {
    // Recherche de l'index
    const index: number = this.products.findIndex(product=> product.id === deleteProduct.productId);

    if(index < 0) {
      return null;
    }

    const findProduct = this.products.find(product=>product.id === deleteProduct.productId);

    RepositoryServiceImpl.getRepository().productUserRepository.deleteByProductId(findProduct!.id);

    // Suppression de la todo
    this.products.splice(index, 1);

    return typeof findProduct === 'undefined' ? null : findProduct;
  }
}