import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { UserNotFindException } from "../../../exceptions/UserNotFindException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";
import imageData from "../../utilities/imageData.json"

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
    await UserFriendGenerator.deleteAllUserFriendRelations();
    await ProductGenerator.createProduct();
   
  });

  it('Should add a new friend', async()=>{   

    // Ajout produit sur le futur ami
    const product1 =  {
      userId: '2',
      openDate: new Date(),
      image: {
        size: 50000,
        data: imageData.image.base64,
        mimetype: 'image/jpeg'
      }        
    }

    const product2 =  {
      userId: '2',
      openDate: new Date(),
      image: {
        size: 50000,
        data: imageData.image.base64,
        mimetype: 'image/jpeg'
      }        
    }

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
    ...product1
    })

    await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      ...product2
    })

    // Ajout relation
    const { friendEmail, name, userId } = { friendEmail: 'helixia22@hotmail.fr', name: 'céline', userId: '1'};
   
    const addFriendRelation = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail,
      friendName: name,
      userId
    });
    
    // Liste des amis du user
    const friends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(userId); 

    // Liste des produit de l'ami
    const productFriend = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriendRelation[0].friendId);

    // Liste des produits du user
    const productUser = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId('1'); 

    expect(addFriendRelation.length).toBe(2);
 
    expect(addFriendRelation[0]).toEqual(expect.objectContaining({
      id: '1',
      friendId: '2',
      userId: '1',
      friendName: 'céline',
      createdAt: addFriendRelation[0].createdAt,
      updatedAt: addFriendRelation[0].updatedAt
    }));

    expect(productFriend.length).toBe(2);    
    expect(productUser.length).toBe(1);
    expect(friends.length).toBe(0);
  
  });

  it('Should throw UserNotFindException because friend email not exit', async()=>{
    try {
      const { friendEmail, name, userId } = { friendEmail: 'helixia22@yahoo.fr', name: 'céline', userId: '1'};
    
      const addFriendRelation = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
        friendEmail,
        friendName: name,
        userId
      });
  
      // Liste des amis du user
      const friends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(userId); 

      // Liste des produit de l'ami
      const productFriend = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriendRelation[0].friendId);
    
        expect(addFriendRelation).toBeFalsy();
        expect(friends.length).toBe(0);
        expect(productFriend.length).toBe(0); 
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFindException)
      }
  });
});