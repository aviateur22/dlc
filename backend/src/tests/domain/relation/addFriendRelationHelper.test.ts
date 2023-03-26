import { AddFriendEntity } from "../../../domain/entities/friend/AddFriendEntity";
import { RelationEntity } from "../../../domain/entities/relation/RelationEntity";
import { Relation } from "../../../domain/useCases/helpers/Relation";
import { ImageGenerator } from "../../utilities/ImageGenerator";
import { ProductGenerator } from "../../utilities/ProductGenerator";
import { ProductUserGenerator } from "../../utilities/ProductUserGenerator";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserFriendGenerator } from "../../utilities/UserFriendGenerator";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('AddFriendRelation', ()=>{
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
   
  it('Should add a new relation', async()=>{

    const addFriend: Partial<AddFriendEntity> = {
      friendEmail : '',
      friendId: "2",
      userId: "1",
      friendName : 'd',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const addFriendRelation = await Relation.addRelation(addFriend);

    expect(addFriendRelation).toBeInstanceOf(RelationEntity);
    expect(addFriendRelation.isNew).toBe(true);
    expect(addFriendRelation.friendId).toBe('2');
    expect(addFriendRelation.friendEmail).toBe('helixia22@hotmail.fr')
  });
});