import { ProductNotFindException } from "../../../exceptions/ProductNotFindException";
import { ProductMapper } from "../../dtos/ProductMapper";
import { ProductEntity } from "../../entities/product/ProductEntity";
import { SearchProductEntity } from "../../entities/product/SearchProductEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";

/**
 * FindProductUseCase
 */
export class FindProductUseCase extends UseCaseModel {

  /**
   * FindProduct
   * @param {SearchProductEntity} searchProduct 
   * @returns {Promise<ProductEntity>}
   */
  async execute(searchProduct: SearchProductEntity): Promise<ProductEntity> {

    const product = await this.repositories.productRepository.findById(new SearchProductEntity({...searchProduct}));

    if(!product) {
      throw new ProductNotFindException(messages.message.errorServer);
    }

    return ProductMapper.getProductEntity({ userId: searchProduct.userId , ...product});
  }
}