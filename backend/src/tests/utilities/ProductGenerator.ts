import { UseCaseServiceImpl } from "../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../infra/services/repository/RepositoryServiceImpl";
import imageData from "./imageData.json";

export class ProductGenerator {
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
    
    const product =  {
      userId: '1',
      openDate: new Date(),
      imageBase64: imageData.image.base64,
      mimeType: imageData.image.mimeType
    }

    const addProduct = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product
    });
  }
}