import { AddFriendEntity } from "../../../domain/entities/friend/AddFriendEntity";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { RelationGenerator } from "../../utilities/RelationGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('FindNewFriendRelation', ()=>{
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
    await RelationGenerator.deleteAllRelations();
    await ProductGenerator.createProduct();   
  });

  it('Should find all new friendRelation', async()=>{

    const relationId = "1";
    const userId = "1";
    
    const addFriend: Partial<AddFriendEntity> = {
      friendEmail : 'helixia22@hotmail.fr',
      friendId: "2",
      userId: "1",
      friendName : 'd',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Ajout Relation
    const addFriendRelation = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute(addFriend);
    
    // Recherche relation acceptée
    const findNewFriendRelation = await UseCaseServiceImpl.getUseCases().relationUseCase.findNewRelationUseCase.execute(userId);

    expect(findNewFriendRelation.length).toBe(1);
 
  });

  it('Should find O new relation because friendRealtion already accepted', async()=>{

    const relationId = "1";
    const userId = "1";
    
    const addFriend: Partial<AddFriendEntity> = {
      friendEmail : 'helixia22@hotmail.fr',
      friendId: "2",
      userId: "1",
      friendName : 'd',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Ajout Relation
    const addFriendRelation = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute(addFriend);

    // Accepte la relation
    const acceptFriendRelation = await UseCaseServiceImpl.getUseCases().relationUseCase.acceptFriendRelationUseCase.execute(relationId);

    // Recherche relation acceptée
    const findNewFriendRelation = await UseCaseServiceImpl.getUseCases().relationUseCase.findNewRelationUseCase.execute(userId);

    expect(findNewFriendRelation.length).toBe(0);
 
  });
});