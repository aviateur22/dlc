import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('FindFriendsUseCase', ()=>{
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
  
  it('Should find Friends of a user', async()=>{
     // Ajout relation
     const { friendEmail, name, userId } = { friendEmail: 'helixia22@hotmail.fr', name: 'céline', userId: '1'};

     const addFriendRelation = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail,
      friendName: name,
      userId
    });  

    // Accepte la relation
    await UseCaseServiceImpl.getUseCases().relationUseCase.acceptFriendRelationUseCase.execute('1');
    
    const findFriends = await UseCaseServiceImpl.getUseCases().friendUseCase.findFriendsUseCase.execute(userId);  
    expect(findFriends.length).toBe(1);
  });
})