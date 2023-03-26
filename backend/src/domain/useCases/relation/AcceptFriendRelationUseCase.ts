import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";
import { AcceptFriendRelationEntity } from "../../entities/relation/AcceptFriendRelationEntity";
import { RelationEntity } from "../../entities/relation/RelationEntity";
import { Friends } from "../helpers/Friends";
import { UseCaseModel } from "../UseCaseModel";

/**
 * AcceptFriendRelation Usecase
 */
export class AcceptFriendRelationUseCase extends UseCaseModel {

  /**
   * Validation FriendRelation usecase
   * @param {AcceptFriendRelationEntity} acceptRelation 
   */
  async execute(relationId: string): Promise<RelationEntity>{

    const findRelation = await this.repositories.relationRepository.findById(relationId);
   
    if(!findRelation) {
      throw new Error('not exist.');
    }

    const acceptRelationData = new AcceptFriendRelationEntity({
      relationId,
      isAccepted: true,
      isNew: false,
    });

    // Mise a jour de la relation
    const acceptRelation = await this.repositories.relationRepository.updateById(acceptRelationData);

    const addFriendRelation = await this.repositories.userFriendRepository.findByRelationId(relationId);

    // Ajout des produits utilisateur user->friend et friend->user
    for(let friend of addFriendRelation) {
      await Friends.addAllProductsToOneFriend(friend.userId, friend.friendId);      
    } 

    return new RelationEntity({
      id: "1",
      friendId: '2',
      isAcceppted: true,
      isNew: true,    
    });

  }
}