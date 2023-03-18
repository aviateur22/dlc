import { ProductNotFindException } from "../../../exceptions/ProductNotFindException";
import { ProductEntity } from "../../entities/product/ProductEntity";
import { UseCaseModel } from "../UseCaseModel";

/**
 * FindProductUseCase
 */
export class FindProductUseCase extends UseCaseModel {

  /**
   * FindProduct
   * @param {string} productId 
   * @returns {Promise<ProductEntity>}
   */
  async execute(productId: string): Promise<ProductEntity> {
    const product = await this.repositories.productRepository.findById(productId);

    if(!product) {
      throw new ProductNotFindException('product not find');
    }

    return new ProductEntity({...product});
  }
}