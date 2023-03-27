import { AddFriendEntity } from "../../../domain/entities/friend/AddFriendEntity";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { Relation } from "../../../domain/useCases/helpers/Relation";
import addFriend from "../../../infra/frameworks/server/express/app/middlewares/validations/schemas/dlc/friend/addFriend";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('RefuseRelationUSeCase', ()=>{
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

  it('Should refuse a relation', async()=>{

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
  
    // Récupération userFriend ayant 1 relation = 1
    let findFriendByRelationId = await RepositoryServiceImpl.getRepository().userFriendRepository.findByRelationId('1');

    expect(findFriendByRelationId.length).toBe(2)
    
    const refuseRelationData = {
      relationId: "1",
      friendId: "2"
    }
    
    const refuseRelation = await UseCaseServiceImpl.getUseCases().relationUseCase.refuseFriendRelationUseCase.execute(refuseRelationData);
    findFriendByRelationId = await RepositoryServiceImpl.getRepository().userFriendRepository.findByRelationId('1');


  expect(findFriendByRelationId.length).toBe(0)


  });
})