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

    // Recherche du produit
    const findProduct = await this.repositories.productRepository.findById(new SearchProductEntity({...searchProduct}));

    if(!findProduct) {
      throw new ProductNotFindException(messages.message.productNotFind);
    }

    // Vérification si produit appartient au user
    const findProdutByUser = await this.repositories.productUserRepository.findByUserIdAndProductId(searchProduct.userId, searchProduct.productId);

    if(findProdutByUser.length === 0) {
      throw new ProductNotFindException(messages.message.productNotToUser);
    }

    return ProductMapper.getProductEntity({ userId: searchProduct.userId , ...findProduct});
  }
}