import { UserFriendEntity } from "../../../domain/entities/friend/UserFriendEntity";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

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
    await UserFriendGenerator.deleteUserProducts();
    await ProductGenerator.createProduct();
    await ProductGenerator.createProduct();
  });

  it('Should delete a friend', async()=>{
    try {
      // Ajout de 1 ami
      const addFriend = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
        friendEmail: 'helixia22@hotmail.fr',
        friendName: 'celine',
        userId: '1'
      });

      // friendProducts
      let friendProducts = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriend.friendId);
   

      // 
      let userFriends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(addFriend.userId);

      expect(friendProducts.length).toBe(2);
      expect(userFriends.length).toBe(1);

      const { friendId, userId } = { friendId: '2', userId: '1'};
      
      
      // Suppression de l'ami
      let deleteFriend: UserFriendEntity = await UseCaseServiceImpl.getUseCases().friendUseCase.deleteFriendUseCase.execute({
        friendId,
        userId
      });
     
      // friendProduct
      friendProducts = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(friendId);

      // userFriend
      userFriends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(addFriend.userId);



      expect(deleteFriend).toBeInstanceOf(UserFriendEntity);
      expect(friendProducts.length).toBe(0);
      expect(userFriends.length).toBe(0);
      

    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});