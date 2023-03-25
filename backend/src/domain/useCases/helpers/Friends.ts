import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { FriendRelationException } from "../../../exceptions/FriendRelationException";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { UserFriendModel } from "../../../infra/models/userFriend/UserFriendModel";
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
      return products.map(product=>product.productId)
    });   
 
    for(let product of productsId) {
      
      // vérification si produit déja rattaché a l'utilisateur
      const findProduct = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserIdAndProductId(friendId, product);
      
      if(findProduct.length === 0) {
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

  /**
   * Vérification Relation user->friend avant supprssion
   * @param {string} userId 
   * @param {string} friendId 
   */
  static async deleteFriendVerification(userId: string, friendId: string) {
    // Vérification Existance Friend
    const findFriend = await RepositoryServiceImpl.getRepository().userRepository.findById(friendId);
    
    if(!findFriend) {
      throw new UserNotFindException(messages.message.userNotFind);
    }

    // Vérification existence friendRelation
    const findFriendRelation = await Friends.checkFriendRelation(userId, friendId);

    if(!findFriendRelation){
      throw new FriendRelationException(messages.message.friendRelationMissing)
    }
  }

  /**
   * Vérification si existance relation user->friend avant ajout d'une nouvelle relation
   * @param {string} userId 
   * @param {string} friendEmail 
   */
  static async addFriendRelationVerification(userId: string, friendEmail: string) {
    // Recherche existance email
    const findFriend = await RepositoryServiceImpl.getRepository().userRepository.findByEmail(friendEmail);
      
    if(!findFriend) {
      // Todo remplacer par l'ajout d'un compte et envoie d'email 
      throw new UserNotFindException(messages.message.emailNotFind);
    }

    // Vérification existence friendRelation
    const findFriendRelation = await Friends.checkFriendRelation(userId, findFriend.id);

    if(findFriendRelation){
      throw new FriendRelationException(messages.message.friendRelationAlreadyExist)
    }
  }

  /**
   * Vérirication Relation user->friend
   * @param {string} userId 
   * @param {string} friendId 
   * @returns {Promise<UserFriendModel|null> }
   */
  private static async checkFriendRelation(userId: string, friendId: string): Promise<UserFriendModel|null> {   

    // Vérifie que la relation n'existe pas
    const findFriendRelation = await RepositoryServiceImpl.getRepository().userFriendRepository.findOneFriendByUserId({
      userId: userId,
      friendId: friendId
    });

    return findFriendRelation
  }
} 