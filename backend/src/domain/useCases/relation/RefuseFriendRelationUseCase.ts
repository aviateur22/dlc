import { DeleteFriendRelationException } from "../../../exceptions/DeleteFriendRelationException";
import { RelationException } from "../../../exceptions/RelationException";
import { RelationMapper } from "../../dtos/RelationMapper";
import { RefuseRelationEntity } from "../../entities/relation/RefuseRelationEntity";
import { RelationEntity } from "../../entities/relation/RelationEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";

/**
 * Relation refusée par l'ami
 */
export class RefuseFriendRelationUseCase extends UseCaseModel {

  /**
   * Refus d'ajout d'une relation
   * @param refuseRelationData 
   */
  async execute(refuseRelationData: Partial<RefuseRelationEntity>): Promise<RelationEntity> {    
  
    const findRelation = await this.repositories.relationRepository.findById(refuseRelationData.relationId!);
   
    if(!findRelation) {
      throw new RelationException(messages.message.relationMissing);
    }

    // Suppr.relation
    const deleteRelation = await this.repositories.relationRepository.deleteById(refuseRelationData.relationId!);
   
    // Vérificaton relation supp.
    const findFriendRelation = await this.repositories.userFriendRepository.findByRelationId(refuseRelationData.relationId!);

    if(findFriendRelation.length > 0) {
      throw new DeleteFriendRelationException(messages.message.friendRelationNotDelete);
    }
    
    return RelationMapper.getRelationEntity(findRelation);
  }
}