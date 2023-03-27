import { AddProductException } from "../../../exceptions/AddProductException";
import { ImageSizeException } from "../../../exceptions/ImageSizeException";
import { ServerException } from "../../../exceptions/ServerException";
import { EncodeBase64 } from "../../../infra/helpers/security/EncodeBase64";
import { ImageModel } from "../../../infra/models/ImageModel";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { AddImageEntity } from "../../entities/image/AddImageEntity";
import { AddFriendProductEntity } from "../../entities/product/AddFriendProductEntity";
import { AddProductEntity } from "../../entities/product/AddProductEntity";
import messages from "../../messages/messages";

export class Product {

  /**
   * Ajout d'une image en base de données
   * @param {Partial<AddProductEntity>} addProduct 
   * @returns {Promise<ImageModel>}
   */
  static async saveImage(addProduct: Partial<AddProductEntity>): Promise<ImageModel> {
    if(!addProduct.image) {
      throw new AddProductException(messages.message.imageMandatory);
    }
    
    let addProductE: AddProductEntity = new AddProductEntity(addProduct);

    if(addProductE.image.size > 5000000) {
      throw new ImageSizeException(messages.message.imageSizeExceed);
    }
    
    // Convertion image en base64
    const imageBase64: string = EncodeBase64.encodeStringToBase64(addProduct.image.data);
    const mimeType: string = addProduct.image.mimetype;

    // Ajout de l'image    
    const addImage = await RepositoryServiceImpl.getRepository().imageRepository.save(new AddImageEntity({
      imageBase64,
      mimeType
    }));

    if(!addImage) {
      throw new ServerException(messages.message.errorServer);
    }

    return addImage;
  }

  /**
   * Ajout des produits d'un utilisateur a son ami
   * @param {string} userId - propriétaire du produit
   * @param {string} friendId - receveur du produit
   */
  static async addAllProductsToOneFriend(userId: string, friendId: string): Promise<void> {
  
    // Récuparation des produits du user
    const productsUser = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserIdAndOwnerId(userId, userId);
  
    for(let product of productsUser) {
      
      // vérification si produit déja rattaché a l'utilisateur
      const findProduct = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserIdAndProductId(friendId, product.productId);
      
      if(findProduct.length === 0) {
        // Date de création
        let createdAt = new Date();

        // Ajout du ProduitUser        
        const addProductUser =  await RepositoryServiceImpl.getRepository().productUserRepository.save({
          productId: product.productId,
          userId: friendId,
          ownerId: product.ownerId,
          createdAt:  createdAt,
          updatedAt: createdAt
        });

        if(!addProductUser) {
          throw new ServerException(messages.message.errorServer);
        }
      }
    }
    
  }
  
  /**
   * Ajout d'un produit à tous les amis
   * 
   * @param {Partial<AddFriendProductEntity>} addProductData
   */
  static async addOneProductToAllFriend(addProductData: AddFriendProductEntity): Promise<void> {
    
    // Date de création
    let createdAt = new Date();

    // Récupération des amis
    const friends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(addProductData.userId!);

    for(let friend of friends) {
      // Ajout du ProduitUser        
      const addProductUser =  await RepositoryServiceImpl.getRepository().productUserRepository.save({
        userId: friend.friendId,
        productId: addProductData.productId,
        ownerId: addProductData.ownerId,
        createdAt:  createdAt,
        updatedAt: createdAt        
      });

      if(!addProductUser) {
        throw new ServerException(messages.message.errorServer);
      }
    }
  }
  
}