import { RefuseRelationEntity } from "../../entities/relation/RefuseRelationEntity";
import { UseCaseModel } from "../UseCaseModel";

/**
 * Relation refusée par l'ami
 */
export class RefuseFriendRelationUseCase extends UseCaseModel {

  /**
   * Refus d'ajout d'une relation
   * @param refuseRelationData 
   */
  async execute(refuseRelationData: Partial<RefuseRelationEntity>): Promise<void> {    
  
    const findRelation = await this.repositories.relationRepository.findById(refuseRelationData.relationId!);
   
    if(!findRelation) {
      throw new Error('not exist.');
    }

    // Suppr.relation
    const deleteRelation = await this.repositories.relationRepository.deleteById(refuseRelationData.relationId!);
   
    // Vérificaton relation supp.
    const findFriendRealtion = await this.repositories.userFriendRepository.findByRelationId(refuseRelationData.relationId!);
    if(findFriendRealtion.length > 0) {
      throw new Error('Error suppr.');
    }    
  }
}