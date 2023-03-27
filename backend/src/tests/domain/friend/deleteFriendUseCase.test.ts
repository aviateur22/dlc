import { UserFriendEntity } from "../../../domain/entities/friend/UserFriendEntity";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";
import imageData from "../../utilities/imageData.json"

describe('DeleteFriendUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();
  
  beforeEach(async()=>{
    await UserGenerator.resteUser();
    await ProductGenerator.deleteProduct();
    await ImageGenerator.deleteImage();
    await ProductUserGenerator.deleteProductUser();
    await UserFriendGenerator.deleteAllUserFriendRelations();
    await ProductGenerator.createProduct();
    await ProductGenerator.createProduct();
  });

  it('Should delete a friend', async()=>{
    try {
      // Ajout de 1 ami
      const addFriendRelation = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
        friendEmail: 'helixia22@hotmail.fr',
        friendName: 'celine',
        userId: '1'
      }); 
      
      const product =  {
        userId: '2',
        openDate: new Date(),
        image: {
          size: 50000,
          data: imageData.image.base64,
          mimetype: 'image/jpeg'
        }        
      }

      // Ajout produit à ami
      const addProductToFriend = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({...product});

      // Récupération des produits de l'ami
      let friendProducts = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriendRelation[0].friendId);   

      // Récupération de tous les amis du user
      let userFriends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(addFriendRelation[0].userId);

      expect(friendProducts.length).toBe(1);
      expect(userFriends.length).toBe(0);
      
      const { friendId, userId } = { friendId: '2', userId: '1'};
            
      // Suppression de l'ami
      let deleteFriendRelation: Array<UserFriendEntity> = await UseCaseServiceImpl.getUseCases().friendUseCase.deleteFriendUseCase.execute({
        friendId,
        userId
      });
     
      // Récupération des produits de l'ami
      friendProducts = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(friendId);

      // Récupération de tous les amis du user
      userFriends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(deleteFriendRelation[0].userId);

      expect(deleteFriendRelation).toBeInstanceOf(Array<UserFriendEntity>);
      expect(friendProducts.length).toBe(1);
      expect(userFriends.length).toBe(0);
      

    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});