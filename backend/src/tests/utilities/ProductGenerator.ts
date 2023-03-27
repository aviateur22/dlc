import { AddProductEntity } from "../../domain/entities/product/AddProductEntity";
import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";
import imageData from "./imageData.json";

export class ProductGenerator {

  // Product a ajouter
  private static product =  {
    userId: '1',
    openDate: new Date('1980-12-20'),
    image: {
      size: 50000,
      data: imageData.image.base64,
      mimetype: 'image/jpeg'
    }        
  }

  private static productEntity: AddProductEntity;

  /**
   * Supp. product
   */
  static async deleteProduct(): Promise<void> {
    await RepositoryServiceImpl.getRepository().productRepository.deleteAll();
  }

  /**
   * Create Pro.
   */
  static async createProduct(): Promise<void> {    
    ProductGenerator.createAddProductEntity();
    const addProduct = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...ProductGenerator.product
    });    
  }

  /**
   * Création d'un AddProductEntity
   */
  private static createAddProductEntity(): void {
    ProductGenerator.productEntity = new AddProductEntity(ProductGenerator.product);
  }

  /**
   * Récupération d'un AddProductEntity
   * @returns {AddProductEntity}
   */
  static getAddProductEntity(): AddProductEntity {
    return ProductGenerator.productEntity
  }
}