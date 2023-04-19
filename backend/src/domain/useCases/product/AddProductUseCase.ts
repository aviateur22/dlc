import { ProductMapper } from "../../dtos/ProductMapper";
import { AddProductEntity } from "../../entities/product/AddProductEntity";
import { ProductEntity } from "../../entities/product/ProductEntity";
import { ProductImageEntity } from "../../entities/product/ProductImageEntity";
import { AddProductUserEntity } from "../../entities/productUser/AddProductUserEntity";
import { ProductUserEntity } from "../../entities/productUser/ProductUserEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";
import { AddFriendProductEntity } from "../../entities/product/AddFriendProductEntity";
import { Product } from "../helpers/Product";
import { ServerException } from "../../../exceptions/ServerException";

export class AddProductUseCase extends UseCaseModel {
  
  /**
   * Ajout d'un produit
   * @param { Partial<AddProductEntity>} addProduct 
   * @returns {Promise<ProductEntity>}
   */
  async execute(addProduct: Partial<AddProductEntity>): Promise<ProductEntity> {

    // Ajout de l'image en base de données
    const addImage = await Product.saveImage(addProduct);

    const productImage = new ProductImageEntity({
      imageId: addImage.id,
      openDate: addProduct.openDate
    });

    // Ajout du produit
    const product = await this.repositories.productRepository.save(productImage);
  
    if(!product) {
      throw new ServerException(messages.message.errorServer);
    }

    const productUser = new ProductUserEntity({
      productId: product.id,
      userId: addProduct.userId     
    });

    // Ajout de la relation produit-user
    const addProductUser = await this.repositories.productUserRepository.save(new AddProductUserEntity({...productUser}));

    if(!addProductUser) {
      throw new ServerException(messages.message.errorServer);
    }
    
    // // Ajout de la relation a tous les amis
    // await Product.addOneProductToAllFriend(new AddFriendProductEntity({
    //   productId: product.id,
    //   userId: addProductUser.userId,
    //   ownerId: addProduct.userId!
    // }));
    
    return ProductMapper.getProductEntity({userId: addProductUser.userId, ...product});
  }
}