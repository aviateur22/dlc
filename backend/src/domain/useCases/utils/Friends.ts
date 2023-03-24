import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import messages from "../../messages/messages";

export class Friends {


  /**
   * Ajout des produits d'un utilisateur a son ami
   * @param {string} userId
   * @param {string} friendId
   */
  static async addAllProductsToOneFriend(userId: string, friendId: string): Promise<void> {
    
    // Récuparation des produits
    const productsId = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(userId).then(products=>{
      return products.map(product=>product.id)
    });

    for(let product of productsId) {
      
      // Date de création
      let createdAt = new Date();

      // Ajout du ProduitUser        
      const addProductUser =  await RepositoryServiceImpl.getRepository().productUserRepository.save({
        productId: product,
        userId: friendId,
        createdAt:  createdAt,
        updatedAt: createdAt
      });
     
      if(!addProductUser) {
        throw new ErrorDatabaseException(messages.message.errorServer);
      }
    }
  }

  /**
   * Ajout d'un produit à tous les amis
   * @param {string} userId
   * @param {string} productId
   */
  static async addOneProductToAllFriend(userId: string, productId: string): Promise<void> {
    // Date de création
    let createdAt = new Date();

    // Récupération des amis
    const friends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(userId);

    for(let friend of friends) {
      // Ajout du ProduitUser        
      const addProductUser =  await RepositoryServiceImpl.getRepository().productUserRepository.save({
        userId: friend.friendId,
        productId: productId,
        createdAt:  createdAt,
        updatedAt: createdAt
      });

      if(!addProductUser) {
        throw new ErrorDatabaseException(messages.message.errorServer);
      }
    }
  }
}