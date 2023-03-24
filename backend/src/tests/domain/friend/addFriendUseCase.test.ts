import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('AddFriendUsecase', ()=>{

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
  });

  it('Should add a new freind', async()=>{
    
    const { friendEmail, name, userId } = { friendEmail: 'helixia22@hotmail.fr', name: 'céline', userId: '1'};
    
    const addFriend = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail,
      friendName: name,
      userId
    });

    const friends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(userId); 
    const productFriend = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriend.friendId);

    expect(addFriend).toEqual(expect.objectContaining({
      id: '1',
      friendId: '2',
      userId: '1',
      friendName: 'céline',
      createdAt: addFriend.createdAt,
      updatedAt: addFriend.updatedAt
    }));

    expect(productFriend.length).toBe(1);
    expect(friends.length).toBe(1);
  });

  it('Should throw UserNotFindException because friend email not exit', async()=>{
    try {
      const { friendEmail, name, userId } = { friendEmail: 'helixia22@yahoo.fr', name: 'céline', userId: '1'};
    
      const addFriend = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
        friendEmail,
        friendName: name,
        userId
      });
  
      // Récupération des amis
      const friends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(userId); 

      // Récupération des produits de l'ami
      const productFriend = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriend.friendId);
  
      expect(addFriend).toBeFalsy();
      expect(friends.length).toBe(0);
      expect(productFriend.length).toBe(0); 
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFindException)
    }
  });
});