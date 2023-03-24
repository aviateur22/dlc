import messages from "../../messages/messages";
import { ActionNotAllowedException } from "../../../exceptions/ActionNotAllowedException";
import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { DeleteProductEntity } from "../../entities/product/DeleteProductEntity";
import { ProductEntity } from "../../entities/product/ProductEntity";
import { UseCaseServiceImpl } from "../../services/UseCaseServiceImpl";
import { UseCaseModel } from "../UseCaseModel";

export class DeleteProductUseCase extends UseCaseModel {

  /**
   * DeleteProduct UseCase
   * @param {Partial<DeleteProductEntity>} product 
   * @returns {Promise<ProductEntity>}
   */
  async execute(product: DeleteProductEntity): Promise<ProductEntity> {
    
    // Verification si product appartient à l'utilisateur
    const findProductUser = await this.repositories.productUserRepository.findByUserIdAndProductId(product.userId, product.productId);

    if(findProductUser.length === 0) {
      throw new ActionNotAllowedException(messages.message.productNotBelongToUser);
    }

    // Verification existence Produit
    const findProduct = await UseCaseServiceImpl.getUseCases().productUsecase.findProductUseCase.execute({userId: product.userId, productId: product.productId});


    // Delete product
    const deleteProduct = await this.repositories.productRepository.deleteById(new DeleteProductEntity({...product}));

    if(!deleteProduct) {
      throw new ErrorDatabaseException(messages.message.errorServer);
    }

    // Récupération FriendsId
    const findAllFriendsOfUser = await this.repositories.userFriendRepository.findAllFriendByUserId(product.userId).then(result=>{
      return result.map(friend=>friend.friendId)
    });

    // Suppression  des relations friend-produits
    await this.repositories.productUserRepository.deleteOneProductForMultipleUsers(product.productId, findAllFriendsOfUser);

    // Delete Image
    const deleteImage = await this.repositories.imageRepository.deleteById(deleteProduct.imageId);

    if(!deleteImage) {
      throw new ErrorDatabaseException(messages.message.errorServer);
    }

    return findProduct;
  }
}