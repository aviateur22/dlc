import { RelationModel } from "../../infra/models/RelationModel";
import { RelationEntity } from "../entities/relation/RelationEntity";

/**
 * Mapper RelationEntiy
 */
export class RelationMapper {
  
  /**
   * Mapp vers Relation Entity
   * @param { UserModel } user 
   * @returns { UserEntity }
   */
  static getRelationEntity(relationData: RelationModel): RelationEntity {    
    const id = relationData.id.toString();
    return new RelationEntity ({ id, ...{isNew: relationData.isNew, isAcceppted: relationData.isAcceppted, friendEmail: relationData.friendEmail, senderId: relationData.senderId, friendId: relationData.friendId.toString(), createdAt: relationData.createdAt, updatedAt: relationData.updatedAt}});
  }
}