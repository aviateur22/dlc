import { DeleteProductEntity } from "../../../domain/entities/product/DeleteProductEntity";
import { ProductImageEntity } from "../../../domain/entities/product/ProductImageEntity";
import { SearchProductEntity } from "../../../domain/entities/product/SearchProductEntity";
import { ProductRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ProductRepositorySchema";
import { ProductModel } from "../../models/product/ProductModel";
import { ProductWithImageModel } from "../../models/product/ProductWithImageModel";
import { RepositoryServiceImpl } from "../../services/repository/RepositoryServiceImpl";
/**
 * User repo PostgreSQL
 */
export class InMemoryProductRepository implements ProductRepositorySchema {
 
  private products: Array<ProductModel> = []

  /**
   * FindProduct by user
   * @param {string} userId
   * @returns Promise<ProductModel[]>
   */
  async findByUserId(userId: string): Promise<ProductWithImageModel[]> {

    // Données productUser By UserId
    const productUserByUserIdList = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(userId);
    const productIdList = productUserByUserIdList.map(item=>item.productId);

    // Données images
    const images = await RepositoryServiceImpl.getRepository().imageRepository.findAll();

    const productWithImage: Array<ProductWithImageModel> = this.products.map(product=>{
      const imageData = images.find(image=>(image.id === product.imageId));
 
        if(typeof imageData === 'undefined') {
          throw new Error('');
        }

        return new ProductWithImageModel({
          id: product.id,                  
          openDate: product.openDate,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        });
    }).filter(product=>productIdList.includes(product.id));
    
    return productWithImage;
  }

  /**
   * FindProductById
   * @param {string} productId 
   */
  async findById(searchProduct: SearchProductEntity): Promise<ProductModel|null> {
    const findProduct = this.products.find(product=>(product.id === searchProduct.productId));

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
  async save(product: ProductImageEntity): Promise<ProductModel|null> {
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