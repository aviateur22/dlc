import { AddFriendEntity } from "../../../domain/entities/friend/AddFriendEntity";
import { RelationEntity } from "../../../domain/entities/relation/RelationEntity";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { RelationGenerator } from "../../utilities/RelationGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('AccepteFriendRelation', ()=>{
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
   
  it('Should add all products from user to friends and friends to user', async()=>{

    const relationId = "1";

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

    // Récuperation liste des amis 
    const friends = await RepositoryServiceImpl.getRepository().userFriendRepository.findAllFriendByUserId(addFriend.userId!);

    // Récuperation produit sur le friend  
    const productFriendArray = await RepositoryServiceImpl.getRepository().productUserRepository.findByUserId(addFriend.friendId!);

    expect(acceptFriendRelation).toBeInstanceOf(RelationEntity);
    expect(friends.length).toBe(1);
    expect(productFriendArray.length).toBe(1);


  });
});