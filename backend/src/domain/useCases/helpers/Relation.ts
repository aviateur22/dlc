import { FriendRelationException } from "../../../exceptions/FriendRelationException";
import { ServerException } from "../../../exceptions/ServerException";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { RelationMapper } from "../../dtos/RelationMapper";
import { AddFriendEntity } from "../../entities/friend/AddFriendEntity";
import { AddFriendRelationEntity } from "../../entities/relation/AddFriendRelationEntity";
import { RelationEntity } from "../../entities/relation/RelationEntity";
import messages from "../../messages/messages";

export class Relation {
  
  /**
   * Ajout d'une nouvelle relation 
   * @param {AddFriendEntity} addFriend
   * @returns {Promise<RelationEntity>}
   * 
   */
  static async addRelation(addFriend: Partial<AddFriendEntity>): Promise<RelationEntity> {

    // Verification existance relation ami user->friend
    Relation.isFriendRelationFind(addFriend.userId!, addFriend.friendId!);

    // Verifcation existance friend->user
    Relation.isFriendRelationFind(addFriend.friendId!, addFriend.userId!);    

    // Données d'ajout de relation
    const addRelationData = new AddFriendRelationEntity({
      friendId: addFriend.friendId,
      isAccepted: false,
      isNew: true
    }) 
    
    const addFriendRelation = await RepositoryServiceImpl.getRepository().relationRepository.save(addRelationData);

    if(!addFriendRelation) {
      throw new ServerException(messages.message.errorServer);
    }
    
    return RelationMapper.getRelationEntity(addFriendRelation);
  }

  static refuseRelation() {

  }

  /**
   * Vérification existance relation amis user->friend
   * @param {string} userId 
   * @param {string} friendId 
   */
  private static async  isFriendRelationFind(userId: string, friendId: string): Promise<void> {

    // vérification que les relations amis user->friend et friend->user n'existent pas
    const findFriendRelation = await RepositoryServiceImpl.getRepository().userFriendRepository.findOneFriendByUserId({
      userId: userId,
      friendId: friendId
    })

    if(findFriendRelation){
      throw new FriendRelationException(messages.message.friendRelationAlreadyExist)
    }
  }
}

