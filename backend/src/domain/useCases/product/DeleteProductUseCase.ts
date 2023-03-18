import { ActionNotAllowedException } from "../../../exceptions/ActionNotAllowedException";
import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { ProductNotFindException } from "../../../exceptions/ProductNotFindException";
import { DeleteProductEntity } from "../../entities/product/DeleteProductEntity";
import { UseCaseServiceImpl } from "../../services/UseCaseServiceImpl";
import { UseCaseModel } from "../UseCaseModel";

export class DeleteProductUseCase extends UseCaseModel {

  /**
   * DeleteProduct UseCase
   * @param {Partial<DeleteProductEntity>} product 
   * @returns 
   */
  async execute(product: DeleteProductEntity): Promise<boolean> {
    
    // Verification si product appartient à l'utilisateur
    const findProductUser = await this.repositories.productUserRepository.findByUserIdAndProductId(product.userId, product.productId);

    if(findProductUser.length === 0) {
      throw new ActionNotAllowedException('action not allowed');
    }

    // Verification existence Produit
    const findProduct = await UseCaseServiceImpl.getUseCases().productUsecase.findProductUseCase.execute(product.productId);

    if(!findProduct) {
      throw new ProductNotFindException('product not find');;
    }

    // Delete product
    const deleteProduct = await this.repositories.productRepository.deleteById(new DeleteProductEntity({...product}));

    if(!deleteProduct) {
      throw new ErrorDatabaseException('error database');
    }

    // Delete Image
    const deleteImage = await this.repositories.imageRepository.deleteById(deleteProduct.imageId);

    if(!deleteImage) {
      throw new ErrorDatabaseException('error database');
    }

    return true
  }
}