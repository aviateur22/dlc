import { RelationException } from "../../../exceptions/RelationException";
import { ServerException } from "../../../exceptions/ServerException";
import { RelationMapper } from "../../dtos/RelationMapper";
import { AcceptFriendRelationEntity } from "../../entities/relation/AcceptFriendRelationEntity";
import { RelationEntity } from "../../entities/relation/RelationEntity";
import messages from "../../messages/messages";
import { Product } from "../helpers/Product";
import { UseCaseModel } from "../UseCaseModel";

/**
 * AcceptFriendRelation Usecase
 */
export class AcceptFriendRelationUseCase extends UseCaseModel {

  /**
   * Validation d'une relation d'ami
   * @param {string} relationId 
   */
  async execute(relationId: string): Promise<RelationEntity>{

    const findRelation = await this.repositories.relationRepository.findById(relationId);
   
    if(!findRelation) {
      throw new RelationException(messages.message.relationMissing);
    }

    const acceptRelationData = new AcceptFriendRelationEntity({
      relationId,
      isAccepted: true,
      isNew: false,
    });

    // Mise a jour de la relation
    const acceptRelation = await this.repositories.relationRepository.updateById(acceptRelationData);

    if(!acceptRelation) {
      throw new ServerException(messages.message.errorServer);
    }

    // Recherche user->friend et friend->user
    const findFriendRelation = await this.repositories.userFriendRepository.findByRelationId(relationId);

    // Ajout des produits utilisateur user->friend et friend->user
    for(let friend of findFriendRelation) {
      await Product.addAllProductsToOneFriend(friend.userId, friend.friendId);      
    }

    return RelationMapper.getRelationEntity(acceptRelation);
  }
}